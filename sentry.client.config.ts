// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://959af188006f45c92241065772.ingest.us.sentry.io/45069',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.0001,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // * This is the default value
  // replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production

  // * This is the default value
  // replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  // * This is the default value
  // integrations: [
  //   Sentry.replayIntegration({
  //     // Additional Replay configuration goes in here, for example:
  //     maskAllText: true,
  //     blockAllMedia: true,
  //   }),
  // ],
});
