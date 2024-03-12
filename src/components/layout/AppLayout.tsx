'use client';

import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-primary font-primary">
      <Header />
      <main className="flex flex-grow text-[var(--text-color-calm-strong)]">
        <div className="mx-auto flex min-h-full  w-full max-w-[1220px] flex-auto flex-grow items-center justify-center">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
