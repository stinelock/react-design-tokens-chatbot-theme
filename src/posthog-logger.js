import posthog from 'posthog-js';

export const posthogLog = {
  info(message, attributes) {
    if (import.meta.env.VITE_POSTHOG_KEY && import.meta.env.VITE_POSTHOG_HOST) {
      posthog.logger.info(message, attributes);
    }
  },
};
