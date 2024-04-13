import RegisterUser from '@/components/RegisterUser/RegisterUser';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import constants from '@/utils/constants';
import { checkUserIsLoggedIn } from '@/utils/helpersServer';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const RegisterPage = async () => {
  const isUserLogged = await checkUserIsLoggedIn();
  if (isUserLogged) {
    redirect('/');
  }

  return (
    <Suspense fallback={<LoadingSpinner height={constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT} />}>
      <RegisterUser />
    </Suspense>
  );
};

export default RegisterPage;
