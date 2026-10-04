/* eslint-disable camelcase -- Exercise the actual SDK wire schema. */
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { test } from 'node:test';
import { gunzipSync } from 'node:zlib';

import {
  sanitizeAnalyticsEvent,
  serviceForLink,
} from '../src/lib/analytics-privacy.ts';
import { translations } from '../src/lib/i18n.ts';

const ID = '11111111-1111-4111-8111-111111111111';
const REVISION = 'a'.repeat(40);
const TOKEN = 'test-public-key';
const PRIVATE = 'PRIVATE_TEST_INPUT';
const PRIVATE_URL = `https://homepage.example/?email=${PRIVATE}&utm_source=${PRIVATE}#${PRIVATE}`;
const BASE_PROPERTIES = {
  $lib: 'web',
  $process_person_profile: false,
  analytics_schema_version: 2,
  service: 'homepage',
  token: TOKEN,
};

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
      assert.equal(
        'app_revision' in
          sanitizeAnalyticsEvent(input, TOKEN, revision).properties,
        false,
      );
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
      ['courses-listing', 'diplomas', 'recordings', 'schedules', 'learnify'],
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
    const requests = [];
    let complete;
    const sent = new Promise((resolve) => {
      complete = resolve;
    });
    t.mock.method(globalThis, 'fetch', (url, options) => {
      requests.push({ body: options.body, url });
      if (requests.length === 3) complete();
      return Promise.resolve(new Response('{}', { status: 200 }));
    });
    const { posthog: sdk } = await import('posthog-js');
    t.after(async () => {
      await sdk.shutdown();
    });
    const enriched = [];
    const initialize = sdk.init.bind(sdk);
    t.mock.method(sdk, 'init', (key, config) =>
      initialize(key, {
        ...config,
        before_send: (event) => {
          enriched.push(event);
          return config.before_send(event);
        },
        persistence: 'memory',
        request_batching: false,
      }),
    );
    const hooks = registerHooks({
      load(url, context, nextLoad) {
        const result = nextLoad(url, context);
        if (!url.endsWith('/src/lib/posthog.ts')) return result;
        return {
          ...result,
          source: String(result.source).replaceAll('import.meta.env', () =>
            JSON.stringify({
              VITE_APP_REVISION: REVISION,
              VITE_POSTHOG_HOST: 'https://ingest.example',
              VITE_POSTHOG_KEY: TOKEN,
            }),
          ),
        };
      },
    });
    t.after(() => hooks.deregister());
    // The SDK captured its minimal non-browser environment above. Only the app's
    // passive listener needs a DOM-shaped fixture; no browser/network dependency.
    const listeners = [];
    class Anchor {
      constructor(href) {
        this.href = href;
      }
      closest() {
        return this;
      }
    }
    const globals = {
      document: {
        addEventListener: (...args) => {
          listeners.push(args);
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
      assert.equal(sdk.config[field], false);
    }
    assert.equal(sdk.config.advanced_disable_flags, true);
    assert.equal(sdk.config.disable_external_dependency_loading, true);
    sdk.sessionRecording.onRemoteConfig({
      config: { sessionRecording: { enabled: true } },
      ok: true,
    });
    assert.equal(sdk.config.disable_session_recording, true);
    assert.equal(sdk.sessionRecording.started, false);
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
    const click = {
      button: 0,
      defaultPrevented: false,
      target: new Anchor(`https://learnify.mk/?q=${PRIVATE}#${PRIVATE}`),
    };
    observeServiceNavigation(click);
    assert.equal(click.defaultPrevented, false);
    assert.equal(
      click.target.href,
      `https://learnify.mk/?q=${PRIVATE}#${PRIVATE}`,
    );
    observeServiceNavigation({ ...click, target: new Anchor(PRIVATE_URL) });
    observeServiceNavigation({ ...click, defaultPrevented: true });
    observeServiceNavigation({ ...click, button: 2 });
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
    assert.equal(
      enriched.at(-1).properties.$current_url.includes(PRIVATE),
      true,
    );
    assert.equal(enriched.at(-1).$set.secret, PRIVATE_URL);
    await sent;
    assert.equal(requests.length, 3);
    assert.ok(requests.every(({ body }) => typeof body !== 'string'));
    const payloads = requests.map(({ body, url }) => {
      assert.equal(url.startsWith('https://ingest.example/e/'), true);
      const text =
        typeof body === 'string'
          ? body
          : gunzipSync(new Uint8Array(body)).toString();
      assert.equal(text.includes(PRIVATE), false);
      const payload = JSON.parse(text);
      assert.equal(payload.api_key, TOKEN);
      const event = payload.batch[0];
      assert.deepEqual(Object.keys(event).sort(), [
        'event',
        'properties',
        'timestamp',
        'uuid',
      ]);
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
      assert.equal(event.properties.app_revision, REVISION);
      assert.equal(event.properties.analytics_schema_version, 2);
      assert.equal(event.properties.$process_person_profile, false);
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
    assert.equal(payloads[1].properties.service_id, 'learnify');
    assert.equal(payloads[2].properties.service_id, 'recordings');
    sdk.opt_out_capturing();
    observeServiceNavigation(click);
    assert.equal(requests.length, 3);
    assert.equal(click.defaultPrevented, false);
    t.mock.method(sdk, 'capture', () => {
      throw new Error('SDK unavailable');
    });
    assert.doesNotThrow(() => observeServiceNavigation(click));
    assert.doesNotThrow(() => observeServiceNavigation(click));
  },
);
