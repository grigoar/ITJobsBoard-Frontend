import ProfileOverview from '@/components/Profile/ProfileOverview';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import constants from '@/utils/constants';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const ProfilePage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login');
  }

  return (
    <Suspense fallback={<LoadingSpinner height={constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT} />}>
      <ProfileOverview />
    </Suspense>
  );
};

export default ProfilePage;
