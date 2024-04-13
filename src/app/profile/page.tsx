import ProfileOverview from '@/components/Profile/ProfileOverview';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const ProfilePage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login');
  }

  return (
    <Suspense>
      <ProfileOverview />
    </Suspense>
  );
};

export default ProfilePage;
