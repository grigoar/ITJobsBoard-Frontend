'use client';

import { useResetEmailPasswordMutation } from '@/api/authenticationApi';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import ResetPasswordModel from '@/models/Users/ResetPasswordBodyModel';
import { toastifySuccess } from '@/utils/helpers';
import ResetPasswordValidationBody from '@/validations/users/ResetPasswordValidationBody';
import { ResetPasswordValidationBodyModel } from '@/validations/users/ResetPasswordValidationBodyModel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Sentry from '@sentry/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormInput from '../common/Form/FormInput';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetEmailPasswordMutation();

  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);
  const [isButtonActionDisabled, setIsButtonActionDisabled] = useState(false);

  const [resetToken, setResetToken] = useState('no-token');

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(ResetPasswordValidationBody, { abortEarly: false, recursive: true }),
    mode: 'all',
  });

  useEffect(() => {
    if (searchParams?.get('reset-token')) {
      setResetToken(searchParams?.get('reset-token') || 'no-token');
    }
  }, [searchParams]);

  const resetUserPasswordHandler = async (resetPasswordData: ResetPasswordModel) => {
    try {
      setIsButtonActionDisabled(true);
      await resetPassword(resetPasswordData).unwrap();

      toastifySuccess('Password reset successfully!');
      showResultSuccessMessage('Your Password was changed! Redirecting to login page...');
      setTimeout(() => {
        router.push('/login');
      }, 3000);

      reset();
    } catch (err: any) {
      showResultErrorMessage(err.data.message);
      Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
    } finally {
      setIsButtonActionDisabled(false);
    }
  };

  const onSubmitHandler = (data: ResetPasswordValidationBodyModel) => {
    const resetPasswordData: ResetPasswordModel = {
      body: {
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      },
      resetPassToken: resetToken,
    };
    resetUserPasswordHandler(resetPasswordData);
  };

  return (
    <div className="flex flex-col">
      <Card>
        <h2>Reset Your Password</h2>
        <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
          <FormInput
            register={register}
            placeholder="*********"
            type="password"
            name="password"
            id="password"
            label="Password"
            required
            control={control}
            errors={errors.password?.message}
            dirtyField={dirtyFields.password}
            watchField={watch('password')}
          />
          <FormInput
            register={register}
            placeholder="*********"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            label="Password Confirm"
            required
            control={control}
            errors={errors.passwordConfirm?.message}
            dirtyField={dirtyFields.passwordConfirm}
            watchField={watch('passwordConfirm')}
          />

          <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
            Send Email
          </Button>
        </FormWrapper>

        <MessageResult
          isLoadingAction={isLoading || isButtonActionDisabled}
          isError={isMessageError}
          message={resultMessageDisplay}
          maxWidth={'450px'}
        />
      </Card>
    </div>
  );
};

export default ResetPassword;
