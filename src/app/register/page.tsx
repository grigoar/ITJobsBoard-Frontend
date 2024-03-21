import RegisterUser from '@/components/RegisterUser/RegisterUser';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const RegisterPage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (isUserLogged) {
    redirect('/');
  }

  return (
    <Suspense>
      <RegisterUser />
    </Suspense>
  );
};

export default RegisterPage;
