'use client';

import { useForgotPasswordMutation } from '@/api/authenticationApi';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import ForgotPasswordBodyModel from '@/models/Users/ForgotPasswordModel';
import ForgotPasswordValidationBody from '@/validations/users/ForgotPasswordValidationBody';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormInput from '../common/Form/FormInput';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';

const ForgotPassword = () => {
  const [forgotPassword, { isLoading, status }] = useForgotPasswordMutation();

  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);
  const [isButtonActionDisabled, setIsButtonActionDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitted },
    reset,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidationBody, { abortEarly: false, recursive: true }),
    mode: 'all',
  });

  const forgotUserPasswordHandler = async (forgotPasswordData: ForgotPasswordBodyModel) => {
    try {
      setIsButtonActionDisabled(true);
      await forgotPassword(forgotPasswordData).unwrap();

      showResultSuccessMessage(
        'Email sent successfully! Please follow the instructions from email to reset your password!'
      );
      reset();
    } catch (err: any) {
      showResultErrorMessage(err.data.message);
      Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
    } finally {
      setIsButtonActionDisabled(false);
    }
  };

  const onSubmitHandler = (data: ForgotPasswordBodyModel) => {
    forgotUserPasswordHandler(data);
  };

  const emailSent = status === 'fulfilled';
  return (
    <div className="flex flex-col">
      <Card>
        <h2>Reset Your Password</h2>
        {!emailSent && (
          <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
            <FormInput
              register={register}
              placeholder="john.doe@gmail.com"
              type="email"
              name="email"
              id="email"
              label="Email"
              required
              control={control}
              errors={errors.email?.message}
              dirtyField={dirtyFields.email}
              watchField={watch('email')}
              submitted={isSubmitted}
            />

            <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
              Send Email
            </Button>
          </FormWrapper>
        )}

        <MessageResult
          isLoadingAction={isLoading || isButtonActionDisabled}
          isError={isMessageError}
          message={resultMessageDisplay}
          maxWidth={'450px'}
        />
        {emailSent && <div className={'classes.resultDisplay'}>*The email may take a few minutes to arrive.</div>}
      </Card>
    </div>
  );
};

export default ForgotPassword;
