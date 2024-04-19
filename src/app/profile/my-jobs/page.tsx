import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React from 'react';

const MyJobsProfilePage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login');
  }
  return <div>MyJobsProfilePage</div>;
};

export default MyJobsProfilePage;
