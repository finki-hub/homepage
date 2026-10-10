/* eslint-disable camelcase -- PostHog configuration and wire fields use snake_case. */
import type { CaptureResult, PostHogConfig } from 'posthog-js';

import {
  CHAT_URL,
  DISCORD_URL,
  GITHUB_URL,
  LEARNIFY_URL,
  SHELL_URL,
} from './constants.ts';

// Only the public entrance links in constants.ts and i18n.ts have a metric.
const SERVICE_LINKS = new Map([
  ['https://diplomski.finki-hub.com/', 'diplomas'],
  ['https://predmeti.finki-hub.com/', 'courses-listing'],
  ['https://rasporedi.finki-hub.com/', 'schedules'],
  ['https://snimki.finki-hub.com/', 'recordings'],
  [`${CHAT_URL}/`, 'chat'],
  [`${LEARNIFY_URL}/`, 'learnify'],
  [`${SHELL_URL}/`, 'shell'],
  [DISCORD_URL, 'discord'],
  [GITHUB_URL, 'github'],
]);
const SERVICE_IDS = new Set(SERVICE_LINKS.values());
const UUID_PATTERN = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/iu;
const REVISION_PATTERN = /^[\da-f]{40}$/u;
const isUuid = (value: unknown): value is string =>
  typeof value === 'string' && UUID_PATTERN.test(value);

export const serviceForLink = (href: string): string | undefined => {
  try {
    const url = new URL(href);
    if (url.username || url.password) return undefined;
    url.search = '';
    url.hash = '';
    return SERVICE_LINKS.get(url.href);
  } catch {
    return undefined;
  }
};

// Rebuild BOTH levels: SDK/caller $set, $set_once and future fields are not safe.
export const sanitizeAnalyticsEvent = (
  event: CaptureResult | null,
  token: string,
  revision: unknown,
): CaptureResult | null => {
  if (!event || !isUuid(event.uuid)) return null;
  if (
    event.event !== 'homepage_view' &&
    event.event !== 'service_navigation_intent'
  )
    return null;
  const input = event.properties;
  const serviceId: unknown = input['service_id'];
  if (
    event.event === 'service_navigation_intent' &&
    (typeof serviceId !== 'string' || !SERVICE_IDS.has(serviceId))
  )
    return null;

  const properties: Record<string, unknown> = {
    $lib: 'web',
    $process_person_profile: false,
    analytics_schema_version: 2,
    service: 'homepage',
    token,
  };
  if (event.event === 'service_navigation_intent')
    properties['service_id'] = serviceId;
  if (typeof revision === 'string' && REVISION_PATTERN.test(revision))
    properties['app_revision'] = revision;
  for (const field of [
    'distinct_id',
    '$device_id',
    '$session_id',
    '$window_id',
  ]) {
    if (isUuid(input[field])) properties[field] = input[field];
  }
  return {
    event: event.event,
    properties,
    ...(event.timestamp instanceof Date &&
      Number.isFinite(event.timestamp.getTime()) && {
        // Recreate the Date: caller-owned toJSON must not become a wire field.
        // eslint-disable-next-line unicorn/prefer-temporal -- PostHog requires a Date timestamp.
        timestamp: new Date(event.timestamp),
      }),
    uuid: event.uuid,
  };
};

export const createAnalyticsConfig = (
  token: string,
  host: string,
  revision: unknown,
): Partial<PostHogConfig> => ({
  advanced_disable_flags: true,
  api_host: host,
  autocapture: false,
  before_send: (event) => sanitizeAnalyticsEvent(event, token, revision),
  capture_dead_clicks: false,
  capture_exceptions: false,
  capture_heatmaps: false,
  capture_pageleave: false,
  capture_pageview: false,
  capture_performance: false,
  disable_capture_url_hashes: true,
  disable_conversations: true,
  disable_external_dependency_loading: true,
  disable_product_tours: true,
  disable_scroll_properties: true,
  disable_session_recording: true,
  disable_surveys: true,
  disableDeviceModel: true,
  // These separate transports bypass event before_send.
  logs: { beforeSend: () => null, captureConsoleLogs: false },
  metrics: { beforeSend: () => null, network: false },
  person_profiles: 'never',
  rageclick: false,
  save_campaign_params: false,
  save_referrer: false,
});
