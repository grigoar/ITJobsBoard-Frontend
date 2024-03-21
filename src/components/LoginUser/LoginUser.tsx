'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import LoginUserModel from '@/models/Users/LoginUserModel';
import LoginUserSchema from '@/validations/users/LoginUserSchema';
import { useLoginUserMutation, useLogoutCurrentUserMutation } from '@/api/authenticationApi';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthErrorModel } from '@/models/Errors/RegisterError';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';

const typeGuardLogin = (tbd: any): tbd is AuthErrorModel => true;

// TODO: Implement redux for the user state

const LoginUser = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [logoutUser] = useLogoutCurrentUserMutation();
  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);
  const [isButtonLoginDisabled, setIsButtonLoginDisabled] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(LoginUserSchema, { abortEarly: false, recursive: true }),
    // mode: 'onTouched',
    mode: 'all',
  });

  // ? this is because of some clearing bug
  const logoutHandler = useCallback(async () => {
    await logoutUser(null);

    // dispatchAppStore(userDataActions.setUserLoggedInStatus(false));
  }, [logoutUser]);

  useEffect(() => {
    const clearLogoutHandler = setTimeout(() => {
      logoutHandler();
    }, 500);

    return () => clearTimeout(clearLogoutHandler);
  }, [logoutHandler]);

  const sendNotificationSuccess = useCallback(() => {
    // dispatchAppStore(appGlobalSettingsActions.setActiveNotification(NotificationLoginRedirect));
    if (searchParams?.get('go-pro') === 'true') {
      router.replace('/go-pro');
    } else {
      router.replace('/?new-user=true');
    }
  }, [router, searchParams]);

  const loginUserHandler = async (user: LoginUserModel) => {
    try {
      // const userLoggedIn = await loginUser(user).unwrap();
      await loginUser(user).unwrap();
      // dispatchAppStore(userDataActions.saveLoggedInUser(userLoggedIn.user));
      // dispatchAppStore(raceStateActions.setIsNewTextNeeded(true));
      // dispatchAppStore(raceStateActions.setIsNewTypingText(true));

      showResultSuccessMessage('Logged in successfully!');
      sendNotificationSuccess();
      setIsButtonLoginDisabled(true);
      // resetUsernameInput();
      // resetPasswordInput();
      reset();
    } catch (err: any) {
      // resetPasswordInput();
      reset({ password: '' });
      if (typeGuardLogin(err)) {
        showResultErrorMessage(err?.data?.message);
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
      }
    }
  };

  const onSubmitHandler = (data: LoginUserModel) => {
    console.log(errors);
    console.log(data.email, data.password);
    loginUserHandler(data);
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
        />
        {/* <p>{errors.email ? errors.email : ''}</p> */}

        <FormInput
          register={register}
          placeholder="password"
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

        {/* {errors.password && <ul>{errors.password?.types?.map((error, index) => <li key={index}>{error}</li>)}</ul>} */}
        {/* <button type="submit">Sign in</button> */}
        <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
          Sign in
        </Button>
      </FormWrapper>
      <MessageResult
        isLoadingAction={isLoading || isButtonLoginDisabled}
        isError={isMessageError}
        message={resultMessageDisplay}
      />
    </Card>
  );
};

export default LoginUser;
