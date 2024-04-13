import ForgotPassword from '@/components/ForgotPassword/ForgotPassword';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import constants from '@/utils/constants';
import React, { Suspense } from 'react';

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner height={constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT} />}>
      <ForgotPassword />
    </Suspense>
  );
};

export default ForgotPasswordPage;
