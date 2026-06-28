import { posthog } from 'posthog-js';

export const initPostHog = () => {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (key === undefined || key === '') {
    return;
  }

  posthog.init(key, {
    // eslint-disable-next-line camelcase -- PostHog SDK option key
    api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
    autocapture: true,
    // eslint-disable-next-line camelcase -- PostHog SDK option key
    capture_exceptions: true,
    // eslint-disable-next-line camelcase -- PostHog SDK option key
    person_profiles: 'always',
  });
};
