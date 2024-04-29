'use client';

import React from 'react';

import Card from '@/components/common/Card/Card';
import ProfileHeader from './ProfileHeader';

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <Card className="pt-0">
      <ProfileHeader />
      <div className="h-full w-full px-2 ">{children}</div>
    </Card>
  );
};

export default ProfileLayout;
