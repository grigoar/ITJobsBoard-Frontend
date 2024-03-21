import RegisterUser from '@/components/RegisterUser/RegisterUser';
import React, { Suspense } from 'react';

const RegisterPage = () => {
  return (
    <Suspense>
      <RegisterUser />
    </Suspense>
  );
};

export default RegisterPage;
