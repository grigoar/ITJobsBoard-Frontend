import '../styles/globals.css';
// import { Analytics } from '@vercel/analytics/react';
// import { Analytics } from '@vercel/analytics/react';
// eslint-disable-next-line import/no-unresolved
// import { Analytics } from '@vercel/analytics/react';
import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
// import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import type { NextPage } from 'next';
import AppLayout from '../components/layout/AppLayout';
import ErrorBoundary from '../components/ErrorsGlobalHandler/ErrorBoundary';
// import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics';

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: any) => {
      return (
        <>
          {/* <GoogleAnalytics /> */}
          <Head>
            <meta name="viewport" content={'width=device-width, initial-scale=1'} />
          </Head>
          <AppLayout>{page}</AppLayout>
          {/* <Analytics /> */}
        </>
      );
    });

  return getLayout(
    <ErrorBoundary>
      <>
        <Head>
          <meta name="viewport" content={'width=device-width, initial-scale=1'} />
        </Head>
        <Component {...pageProps} />
        ssss
        {/* <Analytics /> */}
      </>
    </ErrorBoundary>
  );
}

export default MyApp;
