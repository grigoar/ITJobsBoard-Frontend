import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React from 'react';

const ProfileSavedJobs = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login');
  }
  return <div>ProfileSavedJobs</div>;
};

export default ProfileSavedJobs;
