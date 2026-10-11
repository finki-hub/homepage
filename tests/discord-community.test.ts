/* eslint-disable camelcase -- Match the names in Discord's widget JSON. */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { fetchDiscordCommunity } from '../src/hooks/useDiscordCommunity.ts';
import {
  DISCORD_INVITE_API_URL,
  DISCORD_WIDGET_API_URL,
} from '../src/lib/constants.ts';

const ABORTED_REGEX = /aborted/iu;

const createPendingPromise = <Value = never>() => {
  let resolvePending!: (value: Value) => void;
  const promise = new Promise<Value>((resolve) => {
    resolvePending = resolve;
  });

  return { promise, resolvePending };
};

const widget = {
  id: 'server-id',
  members: [],
  name: 'FINKI Hub',
  presence_count: 12,
};

const jsonResponse = (data: typeof widget): Response =>
  Response.json(data, { status: 200 });

test('malformed optional invite data does not discard a valid widget', async () => {
  const result = await fetchDiscordCommunity({
    fetcher: (url) => {
      if (url === DISCORD_WIDGET_API_URL) {
        return Promise.resolve(jsonResponse(widget));
      }

      return Promise.resolve(new Response('{malformed json', { status: 200 }));
    },
    inviteSignal: new AbortController().signal,
    timeoutMs: 100,
    widgetSignal: new AbortController().signal,
  });

  assert.deepEqual(result.widget, widget);
  assert.equal(await result.inviteCount, null);
});

test('a never-settling optional invite times out without delaying the widget', async () => {
  let inviteSignal: AbortSignal | undefined;
  const result = await fetchDiscordCommunity({
    fetcher: (url, { signal } = {}) => {
      if (url === DISCORD_WIDGET_API_URL) {
        return Promise.resolve(jsonResponse(widget));
      }

      assert.equal(url, DISCORD_INVITE_API_URL);
      inviteSignal = signal ?? undefined;
      return createPendingPromise<Response>().promise;
    },
    inviteSignal: new AbortController().signal,
    timeoutMs: 20,
    widgetSignal: new AbortController().signal,
  });

  assert.deepEqual(result.widget, widget);
  assert.equal(await result.inviteCount, null);
  assert.equal(inviteSignal?.aborted, true);
});

test('a never-settling invite body is also bounded independently', async () => {
  let inviteSignal: AbortSignal | undefined;
  const result = await fetchDiscordCommunity({
    fetcher: (url, { signal } = {}) => {
      if (url === DISCORD_WIDGET_API_URL) {
        return Promise.resolve(jsonResponse(widget));
      }

      inviteSignal = signal ?? undefined;
      return Promise.resolve({
        json: () => createPendingPromise<unknown>().promise,
        ok: true,
      } as Response);
    },
    inviteSignal: new AbortController().signal,
    timeoutMs: 20,
    widgetSignal: new AbortController().signal,
  });

  assert.deepEqual(result.widget, widget);
  assert.equal(await result.inviteCount, null);
  assert.equal(inviteSignal?.aborted, true);
});

test('aborting on unmount cancels both pending Discord requests', async () => {
  const widgetController = new AbortController();
  const inviteController = new AbortController();
  const requestSignals = new Map<string, AbortSignal | null | undefined>();
  let resolveRequestsStarted!: () => void;
  const requestsStarted = new Promise<void>((resolve) => {
    resolveRequestsStarted = resolve;
  });
  const pending = fetchDiscordCommunity({
    fetcher: (url, { signal } = {}) => {
      let requestUrl: string;
      if (typeof url === 'string') requestUrl = url;
      else if (url instanceof URL) requestUrl = url.href;
      else requestUrl = url.url;
      requestSignals.set(requestUrl, signal);
      if (requestSignals.size === 2) {
        resolveRequestsStarted();
      }
      return createPendingPromise<Response>().promise;
    },
    inviteSignal: inviteController.signal,
    timeoutMs: 1_000,
    widgetSignal: widgetController.signal,
  });

  await requestsStarted;
  widgetController.abort();
  inviteController.abort();

  await assert.rejects(pending, ABORTED_REGEX);
  assert.equal(requestSignals.get(DISCORD_WIDGET_API_URL)?.aborted, true);
  assert.equal(requestSignals.get(DISCORD_INVITE_API_URL)?.aborted, true);
});
