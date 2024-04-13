'use client';

import { useValidateEmailMutation } from '@/api/authenticationApi';
import constants from '@/utils/constants';
import * as Sentry from '@sentry/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { toastifySuccess } from '@/utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import Card from '../common/Card/Card';

// TODO: Better styling
const ConfirmEmail = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [validateEmail, { isLoading, isSuccess }] = useValidateEmailMutation();

  const [confirmToken, setConfirmToken] = useState('no-token');

  const router = useRouter();
  const searchParams = useSearchParams();

  const validateUserEmail = useCallback(
    async (confirmTokenValidate: string) => {
      try {
        await validateEmail(confirmTokenValidate).unwrap();
        toastifySuccess('Email Validated!');
        setTimeout(() => {
          router.replace('/profile');
        }, 1000 * 5);
      } catch (err: any) {
        Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
        if ('data' in err) {
          setErrorMessage(err.data.message);
        } else {
          setErrorMessage('Something Went Wrong! Please try again!');
        }
      }
    },
    [validateEmail, router]
  );

  useEffect(() => {
    if (searchParams?.get('confirm-token')) {
      setConfirmToken(searchParams?.get('confirm-token') || 'no-token');
    }
    if (confirmToken !== 'no-token') {
      validateUserEmail(confirmToken);
    }
  }, [confirmToken, searchParams, validateUserEmail]);

  if (confirmToken === 'no-token') return <Card className="error">Invalid token</Card>;

  return (
    <section className={'classes.container'}>
      <div className={`${'classes.confirmEmailWrapper'} pageLayoutOnlyOneCard`}>
        <Card>
          <div className={'classes.confirmContainer'}>
            {isLoading && <p>The Email is now validating! Please wait...</p>}
            {isSuccess && <p className="success">The Email is now validated! Enjoy your ride!</p>}
            <div className="error">{errorMessage}</div>
            {isLoading && <LoadingSpinner height={constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT} />}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ConfirmEmail;
