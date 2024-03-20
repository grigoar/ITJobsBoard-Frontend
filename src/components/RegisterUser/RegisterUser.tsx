'use client';

import React, { useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RegisterUserSchema from '@/validations/users/RegisterUserSchema';
import { useCheckUniqueEmailMutation, useRegisterUserMutation } from '@/api/authenticationApi';
import * as Sentry from '@sentry/nextjs';
import { RegisterUserModel } from '@/models/Users/RegisterUserModel';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { AuthErrorModel } from '@/models/Errors/RegisterError';
import { useRouter, useSearchParams } from 'next/navigation';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';

const typeGuardRegister = (tbd: any): tbd is AuthErrorModel => true;

// TODO: check the spinner loading
// todo: check the cookies
// TODO: hide/show login and register
// TODO: style the login and register on navbar

const RegisterUser = () => {
  const [registerUser, { isLoading: registerUserLoading }] = useRegisterUserMutation();
  const [checkUniqueEmail, { error: uniqueEmailError }] = useCheckUniqueEmailMutation();

  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);

  // console.log('dataUniqueEmail', mutationResult);
  // console.log('error', error);

  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    // formState: { errors, touchedFields, dirtyFields },
    formState: { errors, dirtyFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(RegisterUserSchema, { abortEarly: false, recursive: true }),
    // mode: 'onTouched',
    mode: 'all',
  });

  useEffect(() => {
    // implement a debounce to check if the user is typing

    if (watch('email') === '') return;

    const timeout = setTimeout(() => {
      checkUniqueEmail({ email: watch('email') });
    }, 1500);

    return () => clearTimeout(timeout);
  }, [checkUniqueEmail, watch('email'), errors.email?.message, watch]);

  const sendNotificationSuccess = useCallback(() => {
    // dispatchAppStore(appGlobalSettingsActions.setActiveNotification(NotificationSignUpSuccess));
    // if (router.query['go-pro'] === 'true') {

    if (searchParams?.get('go-pro') === 'true') {
      router.replace('/go-pro');
    } else {
      router.replace('/?new-user=true');
    }
  }, [router, searchParams]);

  const registerNewUserHandler = async (user: RegisterUserModel) => {
    try {
      await registerUser(user).unwrap();
      reset();
      // dispatchAppStore(raceStateActions.setIsNewTextNeeded(true));

      showResultSuccessMessage('User registered successfully!');
      // setIsButtonSignUpDisabled(true);
      sendNotificationSuccess();
    } catch (err: any) {
      Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
      reset({ password: '', passwordConfirm: '' });
      if (typeGuardRegister(err)) {
        showResultErrorMessage(err.data.message);
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
      }
    }
  };

  const onSubmitHandler = (data: RegisterUserModel) => {
    console.log(errors);
    console.log(data.email, data.password);
    console.log(data);
    registerNewUserHandler(data);
    // reset();
  };
  return (
    <Card>
      <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
        <h2>Lets log you in!</h2>

        {/* <input className="text-black" {...register('email')} placeholder="email" type="email" required /> */}
        <FormInput
          register={register}
          placeholder="john.doe@gmail.com"
          type="email"
          name="email"
          id="email"
          label="Email"
          required
          errors={errors.email?.message}
          // touchedField={touchedFields.email}
          dirtyField={dirtyFields.email}
          watchField={watch('email')}
          extraError={typeGuardRegister(uniqueEmailError) ? uniqueEmailError?.data.message : undefined}
        />
        {/* <p>{errors.email ? errors.email : ''}</p> */}

        <FormInput
          register={register}
          placeholder="*********"
          type="password"
          name="password"
          id="password"
          label="Password"
          required
          errors={errors.password?.message}
          // touchedField={touchedFields.password}
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
          errors={errors.passwordConfirm?.message}
          // touchedField={touchedFields.passwordConfirm}
          dirtyField={dirtyFields.passwordConfirm}
          watchField={watch('passwordConfirm')}
        />

        {/* {errors.password && <ul>{errors.password?.types?.map((error, index) => <li key={index}>{error}</li>)}</ul>} */}
        {/* <button type="submit">Sign in</button> */}
        <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
          Sign in
        </Button>
      </FormWrapper>
      <MessageResult
        // isLoadingAction={isLoading || isButtonLoginDisabled}
        // isError={isMessageError}
        // message={resultMessageDisplay}
        isLoadingAction={registerUserLoading}
        isError={isMessageError}
        message={resultMessageDisplay}
      />
    </Card>
  );
};

export default RegisterUser;
