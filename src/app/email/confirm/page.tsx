import ConfirmEmail from '@/components/ConfirmEmail/ConfirmEmail';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import constants from '@/utils/constants';
import React, { Suspense } from 'react';

const EmailConfirmPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner height={constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT} />}>
      <ConfirmEmail />
    </Suspense>
  );
};

export default EmailConfirmPage;
