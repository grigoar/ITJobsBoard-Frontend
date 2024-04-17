import ProfileEdit from '@/components/Profile/ProfileEdit';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React from 'react';

const ProfileEditPage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login');
  }
  return <ProfileEdit />;
};

export default ProfileEditPage;
