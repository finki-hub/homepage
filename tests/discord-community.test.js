/* eslint-disable camelcase -- Match the names in Discord's widget JSON. */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { fetchDiscordCommunity } from '../src/hooks/useDiscordCommunity.ts';
import {
  DISCORD_INVITE_API_URL,
  DISCORD_WIDGET_API_URL,
} from '../src/lib/constants.ts';

const ABORTED_REGEX = /aborted/iu;

const createPendingPromise = () => {
  let resolvePending;
  const promise = new Promise((resolve) => {
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

const jsonResponse = (data) => Response.json(data, { status: 200 });

test('malformed optional invite data does not discard a valid widget', async () => {
  const result = await fetchDiscordCommunity({
    fetcher: (url) => {
      if (url === DISCORD_WIDGET_API_URL) {
        return jsonResponse(widget);
      }

      return new Response('{malformed json', { status: 200 });
    },
    inviteSignal: new AbortController().signal,
    timeoutMs: 100,
    widgetSignal: new AbortController().signal,
  });

  assert.deepEqual(result.widget, widget);
  assert.equal(await result.inviteCount, null);
});

test('a never-settling optional invite times out without delaying the widget', async () => {
  let inviteSignal;
  const result = await fetchDiscordCommunity({
    fetcher: (url, { signal }) => {
      if (url === DISCORD_WIDGET_API_URL) {
        return jsonResponse(widget);
      }

      assert.equal(url, DISCORD_INVITE_API_URL);
      inviteSignal = signal;
      return createPendingPromise().promise;
    },
    inviteSignal: new AbortController().signal,
    timeoutMs: 20,
    widgetSignal: new AbortController().signal,
  });

  assert.deepEqual(result.widget, widget);
  assert.equal(await result.inviteCount, null);
  assert.equal(inviteSignal.aborted, true);
});

test('a never-settling invite body is also bounded independently', async () => {
  let inviteSignal;
  const result = await fetchDiscordCommunity({
    fetcher: (url, { signal }) => {
      if (url === DISCORD_WIDGET_API_URL) {
        return jsonResponse(widget);
      }

      inviteSignal = signal;
      return {
        json: () => createPendingPromise().promise,
        ok: true,
      };
    },
    inviteSignal: new AbortController().signal,
    timeoutMs: 20,
    widgetSignal: new AbortController().signal,
  });

  assert.deepEqual(result.widget, widget);
  assert.equal(await result.inviteCount, null);
  assert.equal(inviteSignal.aborted, true);
});

test('aborting on unmount cancels both pending Discord requests', async () => {
  const widgetController = new AbortController();
  const inviteController = new AbortController();
  const requestSignals = new Map();
  let resolveRequestsStarted;
  const requestsStarted = new Promise((resolve) => {
    resolveRequestsStarted = resolve;
  });
  const pending = fetchDiscordCommunity({
    fetcher: (url, { signal }) => {
      requestSignals.set(url, signal);
      if (requestSignals.size === 2) {
        resolveRequestsStarted();
      }
      return createPendingPromise().promise;
    },
    inviteSignal: inviteController.signal,
    timeoutMs: 1_000,
    widgetSignal: widgetController.signal,
  });

  await requestsStarted;
  widgetController.abort();
  inviteController.abort();

  await assert.rejects(pending, ABORTED_REGEX);
  assert.equal(requestSignals.get(DISCORD_WIDGET_API_URL).aborted, true);
  assert.equal(requestSignals.get(DISCORD_INVITE_API_URL).aborted, true);
});
