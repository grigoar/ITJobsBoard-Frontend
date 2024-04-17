import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React from 'react';

const ResumeCVPage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (!isUserLogged) {
    redirect('/login');
  }
  return <div>ResumeCVPage</div>;
};

export default ResumeCVPage;
