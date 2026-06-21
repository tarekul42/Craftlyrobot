/**
 * Sentry client config — runs in the browser.
 *
 * Captures client-side errors and performance.
 * Only activates when SENTRY_DSN is set.
 *
 * Install: cd web && bun add @sentry/nextjs
 */

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    environment: process.env.NODE_ENV,
  });
}
