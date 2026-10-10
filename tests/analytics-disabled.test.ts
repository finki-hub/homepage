import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { test } from 'node:test';
import { posthog } from 'posthog-js';

import type * as PosthogModule from '../src/lib/posthog.ts';

test('missing/empty key and SDK initialization failures leave startup and navigation usable', async (t) => {
  const environment: Record<string, string | undefined> = {};
  const hooks = registerHooks({
    load(url, context, nextLoad) {
      const result = nextLoad(url, context);
      if (!url.includes('/src/lib/posthog.ts')) return result;
      const source = result.source;
      let sourceText = '';
      if (typeof source === 'string') sourceText = source;
      else if (source) sourceText = new TextDecoder().decode(source);
      return {
        ...result,
        source: sourceText.replaceAll('import.meta.env', () =>
          JSON.stringify(environment),
        ),
      };
    },
  });
  t.after(() => {
    hooks.deregister();
  });
  const initialize = t.mock.method(posthog, 'init', () => {
    throw new Error('Unavailable SDK');
  });
  const capture = t.mock.method(posthog, 'capture', () => {
    assert.fail('disabled capture');
  });
  for (const [index, key] of [undefined, '', 'test-public-key'].entries()) {
    environment['VITE_POSTHOG_KEY'] = key;
    const { initPostHog, observeServiceNavigation } = (await import(
      `../src/lib/posthog.ts?disabled=${index}`
    )) as typeof PosthogModule;
    assert.doesNotThrow(initPostHog);
    assert.doesNotThrow(initPostHog);
    // Disabled analytics returns before DOM access, including primary navigation.
    const event = { button: 0, defaultPrevented: false };
    assert.doesNotThrow(() => {
      observeServiceNavigation(event as unknown as MouseEvent);
    });
    assert.equal(event.defaultPrevented, false);
  }
  assert.equal(initialize.mock.callCount(), 1);
  assert.equal(capture.mock.callCount(), 0);
  // Startup remains outside React's mount/effect lifecycle, including StrictMode.
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- Fixed repository source URL.
  const main = readFileSync(
    new URL('../src/main.tsx', import.meta.url),
    'utf8',
  );
  assert.ok(
    main.indexOf('initPostHog();') < main.indexOf('createRoot(rootElement)'),
  );
});
