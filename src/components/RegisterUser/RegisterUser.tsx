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
import { userDataActions } from '@/store/slices/userDataSlice';
import { useAppDispatch } from '@/store/hooks';
import { toastifySuccess } from '@/utils/helpers';
import { FcGoogle } from 'react-icons/fc';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';
import LoginSuggestion from '../common/LogInSuggestion/LoginSuggestion';

const typeGuardRegister = (tbd: any): tbd is AuthErrorModel => true;

// TODO: style the login and register on navbar
// TODO: Sign in with google account and linke the accounts

const RegisterUser = () => {
  const dispatchAppStore = useAppDispatch();

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
    defaultValues: {
      email: searchParams?.get('email-social') || '',
    },
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
    toastifySuccess('Have a great journey!');
    if (searchParams?.get('go-pro') === 'true') {
      router.replace('/go-pro');
    } else {
      router.replace('/?new-user=true');
    }
  }, [router, searchParams]);

  const registerNewUserHandler = async (user: RegisterUserModel) => {
    try {
      const newUser = await registerUser(user).unwrap();
      reset();
      // dispatchAppStore(raceStateActions.setIsNewTextNeeded(true));
      dispatchAppStore(userDataActions.saveLoggedInUser(newUser.user));

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
    registerNewUserHandler(data);
    // reset();
  };

  const googleAuthHandler = async () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/google`, '_self');
  };

  return (
    <div className="flex flex-col">
      <Card>
        <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
          <h2>Lets register you!</h2>

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

          <FormInput
            register={register}
            placeholder="*********"
            type="password"
            name="password"
            id="password"
            label="Password"
            required
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
            errors={errors.passwordConfirm?.message}
            dirtyField={dirtyFields.passwordConfirm}
            watchField={watch('passwordConfirm')}
          />

          <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
            Register
          </Button>
        </FormWrapper>
        <MessageResult isLoadingAction={registerUserLoading} isError={isMessageError} message={resultMessageDisplay} />
      </Card>
      <Card className="m-0 mt-0 justify-start self-start">
        <div className={'mb-2'}>
          <LoginSuggestion messageBefore="Have an account?" messageAfter="" linkPath={'/login'} linkName="Login" />
        </div>
        <div className={' flex items-center justify-center'}>OR</div>
        <Button
          style={`btn btn-ghost flex items-center justify-center w-full mt-2`}
          type="button"
          action={googleAuthHandler}
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

export default RegisterUser;
