'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import LoginUserModel from '@/models/Users/LoginUserModel';
import LoginUserValidationBody from '@/validations/users/LoginUserValidationBody';
import { useLoginUserMutation, useLogoutCurrentUserMutation } from '@/api/authenticationApi';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useRouter, useSearchParams } from 'next/navigation';
import { userDataActions } from '@/store/slices/userDataSlice';
import { useAppDispatch } from '@/store/hooks';
import { toastifySuccess } from '@/utils/helpers';
import { FcGoogle } from 'react-icons/fc';
import { FederatedCredentialsIssuer } from '@/models/Users/FederatedCredentialsIssuer';
import { FederatedAccountError } from '@/models/Users/FederatedAccountError';
import { typeGuardGeneralError } from '@/models/Errors/typeguards';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';
import LoginSuggestion from '../common/LogInSuggestion/LoginSuggestion';

// TODO: check the refresh page and the theme
const LoginUser = () => {
  const dispatchAppStore = useAppDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [logoutUser] = useLogoutCurrentUserMutation();
  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);
  const [isButtonLoginDisabled, setIsButtonLoginDisabled] = useState(false);
  const [federatedAccount, setFederatedAccount] = useState<FederatedAccountError | undefined>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitted },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(LoginUserValidationBody, { abortEarly: false, recursive: true }),
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

  /* <Button style={`btn btn-ghost !mt-0 mr-2`} link={'/login?add-job=true'}></Button> */

  const sendNotificationSuccess = useCallback(() => {
    toastifySuccess('Logged in successfully!');
    if (searchParams?.get('add-job') === 'true') {
      router.replace('/add-job');
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
      if (typeGuardGeneralError(err)) {
        showResultErrorMessage(err?.data?.message);

        if (err?.data?.err?.extra?.email) {
          // setFederatedAccount(err?.data?.err?.extra?.email);
          setFederatedAccount({
            isFederated: err?.data?.err?.extra?.isFederated,
            email: err?.data?.err?.extra?.email,
            issuer: err?.data?.err?.extra?.issuer,
          });
        }
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

  let registerLinkPath = '/register';
  if (federatedAccount?.email) {
    registerLinkPath = `/register?email-social=${federatedAccount.email}`;
  }
  if (searchParams?.get('add-job') === 'true') {
    registerLinkPath = `/register?add-job=true`;
  }
  return (
    <div className="flex flex-col">
      <Card>
        <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
          {searchParams?.get('add-job') === 'true' ? (
            <h2 className="block w-full">Log in to add a job!</h2>
          ) : (
            <h2 className="block w-full">Lets log you in!</h2>
          )}

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
            submitted={isSubmitted}
          />
          {/* <p>{errors.email ? errors.email : ''}</p> */}

          <FormInput
            register={register}
            placeholder="***********"
            type="password"
            name="password"
            id="password"
            label="Password"
            required
            errors={errors.password?.message}
            // touchedField={touchedFields.password}
            dirtyField={dirtyFields.password}
            watchField={watch('password')}
            submitted={isSubmitted}
          />

          {/* {errors.password && <ul>{errors.password?.types?.map((error, index) => <li key={index}>{error}</li>)}</ul>} */}
          {/* <button type="submit">Sign in</button> */}
          <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
            Log In
          </Button>
        </FormWrapper>
        <MessageResult
          isLoadingAction={isLoading || isButtonLoginDisabled}
          isError={isMessageError}
          message={resultMessageDisplay}
          maxWidth={'450px'}
        />
        {/* <Button style={`btn btn-ghost `} type="submit" action={googleAuthHandler}>
        Sign in with Google
      </Button> */}
      </Card>

      <Card className="m-0 mt-0 justify-start self-start">
        <div className={'mb-2'}>
          <LoginSuggestion
            messageBefore="Don't have an account?"
            messageAfter=""
            linkPath={registerLinkPath}
            linkName="Register"
          />
        </div>
        <div className={' flex items-center justify-center'}>OR</div>
        <Button
          style={`btn btn-ghost flex items-center justify-center w-full mt-2`}
          type="button"
          action={googleAuthHandler}
          focus={federatedAccount?.issuer === FederatedCredentialsIssuer.GOOGLE}
        >
          <div className="flex items-center justify-center gap-2">
            <FcGoogle />
            Log in with Google
          </div>
        </Button>
      </Card>
    </div>
  );
};

export default LoginUser;
