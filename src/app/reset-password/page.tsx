import ResetPassword from '@/components/ResetPassword/ResetPassword';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import constants from '@/utils/constants';
import React, { Suspense } from 'react';

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner height={constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT} />}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
