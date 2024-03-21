import LoginUser from '@/components/LoginUser/LoginUser';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const LoginPage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (isUserLogged) {
    redirect('/');
  }

  return (
    <Suspense>
      <LoginUser />
    </Suspense>
  );
};

export default LoginPage;
