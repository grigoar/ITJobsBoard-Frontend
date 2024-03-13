'use client';

import React from 'react';

import ErrorBoundary from '../ErrorsGlobalHandler/ErrorBoundary';
import Header from './header/Header';
import Footer from './footer/Footer';

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-primary font-primary">
        <Header />
        <main className="flex flex-grow text-[var(--text-color-calm-strong)]">
          <div className="mx-auto flex min-h-full  w-full max-w-[1220px] flex-auto flex-grow items-center justify-center">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default AppLayout;
