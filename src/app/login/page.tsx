import LoginUser from '@/components/LoginUser/LoginUser';
import React, { Suspense } from 'react';

const LoginPage = () => {
  return (
    <Suspense>
      <LoginUser />
    </Suspense>
  );
};

export default LoginPage;
