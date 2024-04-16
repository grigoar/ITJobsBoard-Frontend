'use client';

import React from 'react';

import ProfileHeader from './ProfileHeader';
// import ErrorBoundary from '../ErrorsGlobalHandler/ErrorBoundary';
// import Header from './header/Header';
// import Footer from './footer/Footer';

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <div className="mt-6 flex h-full w-full flex-grow flex-col border-2 border-slate-200 bg-primary font-primary">
      <ProfileHeader />
      <div className="mx-auto flex w-full max-w-[1220px] flex-auto flex-grow items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
