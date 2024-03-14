const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { withSentryConfig } = require('@sentry/nextjs');
/** @type {import('next').NextConfig} */

const securityHeaders = (env) => {
  const cspKey = env !== PHASE_DEVELOPMENT_SERVER ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';

  return [
    // * This is for caching the data for a day and storing it only on the user browser cache
    // * This is not working properly, because when the user is logged out, the data is still cached
    // {
    //   key: 'Cache-Control',
    //   value: 'max-age=86400, private',
    // },
    {
      // ? This seems fine
      // * This is for setting the content security policy to only allow the resources from the allowed sources
      key: cspKey,
      value: `default-src 'self'; font-src 'self'; img-src 'self' data: ${process.env.NEXT_PUBLIC_AWS_STORAGE_PATH_URL} blob: ${process.env.NEXT_PUBLIC_SITE_DOMAIN_URL}; script-src 'self' https://js.stripe.com/; frame-src https://js.stripe.com/; style-src 'self' 'unsafe-inline'; frame-ancestors 'self'; connect-src 'self' https://o1365772.ingest.us.sentry.io/api/4506904969019392/envelope/`,
      // value: `default-src 'self'; font-src 'self'; img-src 'self' data: ${process.env.NEXT_PUBLIC_AWS_STORAGE_PATH_URL} blob: ${process.env.NEXT_PUBLIC_SITE_DOMAIN_URL}; script-src 'self' https://*.vercel-insights.com https://js.stripe.com/; frame-src https://js.stripe.com/; style-src 'self' 'unsafe-inline'; frame-ancestors 'self'; connect-src 'self' https://o1365772.ingest.sentry.io/api/6661983/envelope/  https://*.vercel-insights.com;`,
    },
    // * Prefetch the DNS for the external scripts links addresses
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    // * Enforce HTTPS protocol for 2 years after deployment
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    // * X-XSS-PROTECTION (XSS attacks)
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
    // * X-Frame-Options (clickjacking attacks)
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
    // * X-Content-Type-Options (MIME sniffing attacks)
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()',
    },
    // * X-Content-Type-Options (XSS attacks)
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    // * Referrer-Policy to communicate only through HTTPS
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
  ];
};

const nextConfig = (phase) => {
  return {
    webpack(config) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
        fs: false, // the solution
      };

      return config;
    },
    // * not needed for now
    // images: {
    //   domains: ['typing-muscle.s3.eu-central-1.amazonaws.com'],
    // },
    // * not needed for now
    // async redirects() {
    //   return [
    //     {
    //       source: '/admin-panel',
    //       destination: '/admin-panel/users',
    //       permanent: true,
    //     },
    //   ];
    // },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders(phase),
        },
      ];
    },
    sentry: {
      hideSourceMaps: true,
      silent: true,
      // org: 'c-qv',
      // project: 'it-jobs-board',
      // See the 'Configure Source Maps' and 'Configure Legacy Browser Support'
      // sections below for information on the following options:
      //   - disableServerWebpackPlugin
      //   - disableClientWebpackPlugin
      //   - hideSourceMaps
      //   - widenClientFileUpload
      //   - transpileClientSDK

      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options
    },
  };
};

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  silent: true,
  org: 'c-qv',
  project: 'it-jobs-board',
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
