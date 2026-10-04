import { posthog } from 'posthog-js';

import { createAnalyticsConfig, serviceForLink } from './analytics-privacy.ts';

const state = { enabled: false, initialized: false };

const capture = (event: string, properties?: Record<string, string>) => {
  if (!state.enabled) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // Analytics must never interrupt the page or a link's native navigation.
    state.enabled = false;
  }
};

export const observeServiceNavigation = (event: MouseEvent) => {
  if (
    !state.enabled ||
    event.defaultPrevented ||
    event.button !== 0 ||
    !(event.target instanceof Element)
  )
    return;
  const anchor = event.target.closest('a[href]');
  if (!(anchor instanceof HTMLAnchorElement)) return;
  const serviceId = serviceForLink(anchor.href);
  if (serviceId) {
    // eslint-disable-next-line camelcase -- Fixed analytics schema field.
    capture('service_navigation_intent', { service_id: serviceId });
  }
};

export const initPostHog = () => {
  if (state.initialized) return;
  state.initialized = true;
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (key === undefined || key === '') {
    return;
  }

  try {
    posthog.init(
      key,
      createAnalyticsConfig(
        key,
        import.meta.env.VITE_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
        import.meta.env.VITE_APP_REVISION,
      ),
    );
    state.enabled = true;
    // Single-document homepage, initialized in main.tsx outside React effects.
    // Hash/section navigation and component remounts are not additional visits.
    capture('homepage_view');
    document.addEventListener('click', observeServiceNavigation, {
      passive: true,
    });
  } catch {
    state.enabled = false;
  }
};
