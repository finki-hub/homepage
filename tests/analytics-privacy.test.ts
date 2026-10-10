/* eslint-disable camelcase -- Exercise the actual SDK wire schema. */
import type { CaptureResult, PostHogConfig } from 'posthog-js';

import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { test } from 'node:test';
import { gunzipSync } from 'node:zlib';

import {
  sanitizeAnalyticsEvent as sanitizeAnalyticsEventImpl,
  serviceForLink,
} from '../src/lib/analytics-privacy.ts';
import { translations } from '../src/lib/i18n.ts';

const ID = '11111111-1111-4111-8111-111111111111';
const REVISION = 'a'.repeat(40);
const TOKEN = 'test-public-key';
const PRIVATE = 'PRIVATE_TEST_INPUT';
const COLLATOR = new Intl.Collator('en');
const PRIVATE_URL = `https://homepage.example/?email=${PRIVATE}&utm_source=${PRIVATE}#${PRIVATE}`;
const BASE_PROPERTIES = {
  $lib: 'web',
  $process_person_profile: false,
  analytics_schema_version: 2,
  service: 'homepage',
  token: TOKEN,
};

// This test intentionally feeds malformed runtime data through a typed SDK
// boundary, so keep the single unsafe conversion local to the test helper.
const sanitizeAnalyticsEvent = (
  event: unknown,
  token: string = TOKEN,
  revision?: unknown,
): CaptureResult | null =>
  sanitizeAnalyticsEventImpl(event as CaptureResult | null, token, revision);

test('rebuilds both payload levels; trusted fields cannot be overridden', () => {
  for (const event of ['homepage_view', 'service_navigation_intent']) {
    const input = {
      $set: { url: PRIVATE_URL },
      $set_once: { url: PRIVATE_URL },
      event,
      extra: PRIVATE,
      properties: {
        $current_url: PRIVATE_URL,
        $device_id: ID,
        $elements: [{ text: PRIVATE }],
        $referrer: PRIVATE_URL,
        $set: { secret: PRIVATE },
        $set_once: { secret: PRIVATE },
        analytics_schema_version: PRIVATE,
        app_revision: 'b'.repeat(40),
        distinct_id: ID,
        service: PRIVATE,
        service_id: 'learnify',
        token: PRIVATE,
      },
      // eslint-disable-next-line unicorn/prefer-temporal -- SDK timestamp is a Date.
      timestamp: new Date(1_767_225_600_000),
      uuid: ID,
    };
    assert.deepEqual(sanitizeAnalyticsEvent(input, TOKEN, REVISION), {
      event,
      properties: {
        ...BASE_PROPERTIES,
        $device_id: ID,
        app_revision: REVISION,
        distinct_id: ID,
        ...(event === 'service_navigation_intent' && {
          service_id: 'learnify',
        }),
      },
      timestamp: input.timestamp,
      uuid: ID,
    });
    for (const revision of [
      undefined,
      '',
      'INVALID',
      'A'.repeat(40),
      PRIVATE_URL,
    ]) {
      const sanitized = sanitizeAnalyticsEvent(input, TOKEN, revision);
      assert.ok(sanitized);
      assert.equal('app_revision' in sanitized.properties, false);
    }
    assert.equal(input.properties.$current_url, PRIVATE_URL);
    input.timestamp.toJSON = () => PRIVATE;
    assert.equal(
      JSON.stringify(sanitizeAnalyticsEvent(input, TOKEN, REVISION)).includes(
        PRIVATE,
      ),
      false,
    );
  }
});

test('unknown events and malformed service IDs/technical metadata cannot carry data', () => {
  for (const event of [
    '$autocapture',
    '$pageview',
    '$pageleave',
    '$exception',
    '$snapshot',
    '$identify',
    '$set',
    '$feature_flag_called',
    'unknown',
    'constructor',
  ]) {
    assert.equal(
      sanitizeAnalyticsEvent({ event, properties: {}, uuid: ID }, TOKEN),
      null,
    );
  }
  for (const service_id of [
    undefined,
    PRIVATE_URL,
    { nested: PRIVATE },
    'constructor',
  ]) {
    assert.equal(
      sanitizeAnalyticsEvent(
        {
          event: 'service_navigation_intent',
          properties: { service_id },
          uuid: ID,
        },
        TOKEN,
      ),
      null,
    );
  }
  for (const uuid of [undefined, PRIVATE_URL, { nested: PRIVATE }]) {
    assert.equal(
      sanitizeAnalyticsEvent(
        { event: 'homepage_view', properties: {}, uuid },
        TOKEN,
      ),
      null,
    );
  }
  assert.equal(sanitizeAnalyticsEvent(null, TOKEN), null);
  assert.deepEqual(
    sanitizeAnalyticsEvent(
      {
        event: 'homepage_view',
        properties: {
          $device_id: PRIVATE_URL,
          $lib_version: PRIVATE,
          distinct_id: PRIVATE,
        },
        timestamp: PRIVATE_URL,
        uuid: ID,
      },
      TOKEN,
    ),
    { event: 'homepage_view', properties: BASE_PROPERTIES, uuid: ID },
  );
});

test('public registry links map to fixed IDs, never destinations or DOM labels', () => {
  for (const language of Object.values(translations)) {
    assert.deepEqual(
      language.platforms.items.map(({ url }) => serviceForLink(url)),
      [
        'courses-listing',
        'diplomas',
        'recordings',
        'schedules',
        'learnify',
        'shell',
        'chat',
      ],
    );
  }
  assert.equal(
    serviceForLink(`https://learnify.mk/?q=${PRIVATE}#${PRIVATE}`),
    'learnify',
  );
  for (const url of [
    // eslint-disable-next-line no-script-url -- Verify rejection of a non-HTTP destination.
    'javascript:alert(1)',
    'https://learnify.mk.evil.example/',
    'https://learnify.mk/private',
    'https://private@learnify.mk/',
    '#platforms',
    PRIVATE_URL,
  ]) {
    assert.equal(serviceForLink(url), undefined);
  }
});

test(
  'real SDK compressed transport: startup once, approved navigation, remote defenses and opt-out',
  { timeout: 10_000 },
  // eslint-disable-next-line max-lines-per-function -- One isolated SDK lifecycle through the actual transport.
  async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
    Object.defineProperty(globalThis, 'location', {
      configurable: true,
      value: new URL(PRIVATE_URL),
    });
    t.after(() => Reflect.deleteProperty(globalThis, 'location'));
    const requests: Array<{ body: unknown; url: string }> = [];
    let complete!: () => void;
    const sent = new Promise<void>((resolve) => {
      complete = resolve;
    });
    t.mock.method(
      globalThis,
      'fetch',
      (url: RequestInfo | URL, options?: RequestInit) => {
        let requestUrl: string;
        if (typeof url === 'string') requestUrl = url;
        else if (url instanceof URL) requestUrl = url.href;
        else requestUrl = url.url;
        requests.push({ body: options?.body, url: requestUrl });
        if (requests.length === 3) complete();
        return Promise.resolve(new Response('{}', { status: 200 }));
      },
    );
    const { posthog: sdk } = await import('posthog-js');
    t.after(async () => {
      await sdk.shutdown();
    });
    const enriched: CaptureResult[] = [];
    const initialize = sdk.init.bind(sdk);
    t.mock.method(sdk, 'init', (key: string, config: Partial<PostHogConfig>) =>
      initialize(key, {
        ...config,
        before_send: (event) => {
          if (!event) return null;
          enriched.push(event);
          const beforeSend = config.before_send;
          const callbacks =
            typeof beforeSend === 'function'
              ? [beforeSend]
              : (beforeSend ?? []);
          let sanitized: CaptureResult | null = event;
          for (const callback of callbacks) {
            sanitized &&= callback(sanitized);
          }
          return sanitized;
        },
        persistence: 'memory',
        request_batching: false,
      }),
    );
    const hooks = registerHooks({
      load(url, context, nextLoad) {
        const result = nextLoad(url, context);
        if (!url.endsWith('/src/lib/posthog.ts')) return result;
        const source = result.source;
        let sourceText = '';
        if (typeof source === 'string') sourceText = source;
        else if (source) sourceText = new TextDecoder().decode(source);
        return {
          ...result,
          source: sourceText.replaceAll('import.meta.env', () =>
            JSON.stringify({
              VITE_APP_REVISION: REVISION,
              VITE_POSTHOG_HOST: 'https://ingest.example',
              VITE_POSTHOG_KEY: TOKEN,
            }),
          ),
        };
      },
    });
    t.after(() => {
      hooks.deregister();
    });
    // The SDK captured its minimal non-browser environment above. Only the app's
    // passive listener needs a DOM-shaped fixture; no browser/network dependency.
    const listeners: Array<
      [string, EventListenerOrEventListenerObject, AddEventListenerOptions]
    > = [];
    class Anchor {
      href: string;

      constructor(href: string) {
        this.href = href;
      }

      closest(): this {
        return this;
      }
    }
    const globals = {
      document: {
        addEventListener: (
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: AddEventListenerOptions | boolean,
        ) => {
          listeners.push([
            type,
            listener,
            typeof options === 'boolean'
              ? { capture: options }
              : (options ?? {}),
          ]);
        },
        referrer: PRIVATE_URL,
      },
      Element: Anchor,
      HTMLAnchorElement: Anchor,
    };
    for (const [key, value] of Object.entries(globals)) {
      Object.defineProperty(globalThis, key, { configurable: true, value });
      t.after(() => Reflect.deleteProperty(globalThis, key));
    }
    const { initPostHog, observeServiceNavigation } =
      await import('../src/lib/posthog.ts');
    initPostHog();
    initPostHog();
    assert.equal(listeners.length, 1);
    assert.deepEqual(listeners[0], [
      'click',
      observeServiceNavigation,
      { passive: true },
    ]);
    assert.equal(
      enriched.filter(({ event }) => event === 'homepage_view').length,
      1,
    );
    for (const field of [
      'autocapture',
      'capture_exceptions',
      'capture_pageview',
      'capture_pageleave',
      'capture_performance',
      'capture_heatmaps',
      'save_campaign_params',
      'save_referrer',
    ]) {
      assert.equal(sdk.config[field as keyof typeof sdk.config], false);
    }
    assert.equal(sdk.config.advanced_disable_flags, true);
    assert.equal(sdk.config.disable_external_dependency_loading, true);
    const sessionRecording = sdk.sessionRecording as
      | undefined
      | {
          onRemoteConfig: (remoteConfig: {
            config: { sessionRecording: { enabled: boolean } };
            ok: boolean;
          }) => void;
          started: boolean;
        };
    assert.ok(sessionRecording);
    sessionRecording.onRemoteConfig({
      config: { sessionRecording: { enabled: true } },
      ok: true,
    });
    assert.equal(sdk.config.disable_session_recording, true);
    assert.equal(sessionRecording.started, false);
    sdk.register({
      $initial_referrer: PRIVATE_URL,
      $referrer: PRIVATE_URL,
      text: PRIVATE,
      utm_source: PRIVATE,
    });
    for (const event of [
      '$autocapture',
      '$pageview',
      '$pageleave',
      '$snapshot',
      '$identify',
      'unknown',
    ]) {
      assert.equal(sdk.capture(event, { secret: PRIVATE }), undefined);
    }
    sdk.captureException(new Error(PRIVATE));
    sdk.captureLog({ body: PRIVATE, level: 'error' });
    sdk.logs.flushLogs();
    sdk.metrics.count(PRIVATE);
    await sdk.metrics.flush();
    type ClickFixture = {
      button: number;
      defaultPrevented: boolean;
      target: Anchor;
    };
    const observe = (event: ClickFixture) => {
      observeServiceNavigation(event as unknown as MouseEvent);
    };
    const click: ClickFixture = {
      button: 0,
      defaultPrevented: false,
      target: new Anchor(`https://learnify.mk/?q=${PRIVATE}#${PRIVATE}`),
    };
    observe(click);
    assert.equal(click.defaultPrevented, false);
    assert.equal(
      click.target.href,
      `https://learnify.mk/?q=${PRIVATE}#${PRIVATE}`,
    );
    observe({ ...click, target: new Anchor(PRIVATE_URL) });
    observe({ ...click, defaultPrevented: true });
    observe({ ...click, button: 2 });
    location.hash = PRIVATE;
    initPostHog();
    sdk.capture(
      'service_navigation_intent',
      {
        $set: { secret: PRIVATE_URL },
        analytics_schema_version: 'spoof',
        app_revision: 'spoof',
        service_id: 'recordings',
      },
      { $set: { secret: PRIVATE_URL }, $set_once: { secret: PRIVATE_URL } },
    );
    const lastEnriched = enriched.at(-1);
    assert.ok(lastEnriched);
    assert.equal(
      (lastEnriched.properties['$current_url'] as string).includes(PRIVATE),
      true,
    );
    assert.equal(lastEnriched.$set?.['secret'], PRIVATE_URL);
    await sent;
    assert.equal(requests.length, 3);
    assert.ok(requests.every(({ body }) => typeof body !== 'string'));
    const payloads: Array<{
      event: string;
      properties: Record<string, unknown>;
    }> = requests.map(({ body, url }) => {
      assert.equal(url.startsWith('https://ingest.example/e/'), true);
      const text =
        typeof body === 'string'
          ? body
          : gunzipSync(body as Uint8Array).toString();
      assert.equal(text.includes(PRIVATE), false);
      const parsed: unknown = JSON.parse(text);
      assert.ok(
        typeof parsed === 'object' &&
          parsed !== null &&
          'api_key' in parsed &&
          'batch' in parsed &&
          Array.isArray(parsed.batch),
      );
      const payload = parsed as {
        api_key: string;
        batch: Array<{
          event: string;
          properties: Record<string, unknown>;
          timestamp?: string;
          uuid: string;
        }>;
      };
      assert.equal(payload.api_key, TOKEN);
      const event = payload.batch[0];
      assert.ok(event);
      assert.deepEqual(
        Object.keys(event).sort((a, b) => COLLATOR.compare(a, b)),
        ['event', 'properties', 'timestamp', 'uuid'],
      );
      const allowed = new Set([
        ...Object.keys(BASE_PROPERTIES),
        '$device_id',
        '$session_id',
        '$window_id',
        'app_revision',
        'distinct_id',
        'service_id',
      ]);
      assert.equal(
        Object.keys(event.properties).every((key) => allowed.has(key)),
        true,
      );
      assert.equal(event.properties['app_revision'], REVISION);
      assert.equal(event.properties['analytics_schema_version'], 2);
      assert.equal(event.properties['$process_person_profile'], false);
      return event;
    });
    assert.deepEqual(
      payloads.map(({ event }) => event),
      [
        'homepage_view',
        'service_navigation_intent',
        'service_navigation_intent',
      ],
    );
    assert.ok(payloads[1]);
    assert.ok(payloads[2]);
    assert.equal(payloads[1].properties['service_id'], 'learnify');
    assert.equal(payloads[2].properties['service_id'], 'recordings');
    sdk.opt_out_capturing();
    observe(click);
    assert.equal(requests.length, 3);
    assert.equal(click.defaultPrevented, false);
    t.mock.method(sdk, 'capture', () => {
      throw new Error('SDK unavailable');
    });
    assert.doesNotThrow(() => {
      observe(click);
    });
    assert.doesNotThrow(() => {
      observe(click);
    });
  },
);
