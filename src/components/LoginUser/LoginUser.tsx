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
import { userDataActions } from '@/store/slices/userDataSlice';
import { useAppDispatch } from '@/store/hooks';
import { toastifySuccess } from '@/utils/helpers';
import { FcGoogle } from 'react-icons/fc';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';

const typeGuardLogin = (tbd: any): tbd is AuthErrorModel => true;

// TODO: check the refresh page and the theme
// TODO: Add the option to link the accounts if the user is already has an account (google login and email login) ( send user to set a password when this happens)
const LoginUser = () => {
  const dispatchAppStore = useAppDispatch();

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

    dispatchAppStore(userDataActions.setUserLoggedInStatus(false));
  }, [logoutUser, dispatchAppStore]);

  useEffect(() => {
    const clearLogoutHandler = setTimeout(() => {
      logoutHandler();
    }, 500);

    return () => clearTimeout(clearLogoutHandler);
  }, [logoutHandler]);

  const sendNotificationSuccess = useCallback(() => {
    toastifySuccess('Logged in successfully!');
    if (searchParams?.get('go-pro') === 'true') {
      router.replace('/go-pro');
    } else {
      router.replace('/?new-user=true');
    }
  }, [router, searchParams]);

  const loginUserHandler = async (user: LoginUserModel) => {
    try {
      const userLoggedIn = await loginUser(user).unwrap();
      dispatchAppStore(userDataActions.saveLoggedInUser(userLoggedIn.user));

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
      // toastifyError('Login failed! Please try again!');
    }
  };

  const onSubmitHandler = (data: LoginUserModel) => {
    loginUserHandler(data);
  };

  const googleAuthHandler = async () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/google`, '_self');
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
      {/* <Button style={`btn btn-ghost `} type="submit" action={googleAuthHandler}>
        Sign in with Google
      </Button> */}
      <Button style={`btn btn-ghost `} type="submit" action={googleAuthHandler}>
        <div className="flex items-center justify-center gap-2">
          <FcGoogle />
          Sign in with Google
        </div>
      </Button>
    </Card>
  );
};

export default LoginUser;
