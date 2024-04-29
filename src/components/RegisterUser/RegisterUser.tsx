'use client';

import { useCheckUniqueEmailMutation, useRegisterUserMutation } from '@/api/authenticationApi';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { typeGuardGeneralError } from '@/models/Errors/typeguards';
import { RegisterUserModel } from '@/models/Users/RegisterUserModel';
import { useAppDispatch } from '@/store/hooks';
import { userDataActions } from '@/store/slices/userDataSlice';
import { toastifySuccess } from '@/utils/helpers';
import SignUpUserValidationBody from '@/validations/users/SignUpUserValidationBody';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Sentry from '@sentry/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormInput from '../common/Form/FormInput';
import FormWrapper from '../common/Form/FormWrapper';
import LoginSuggestion from '../common/LogInSuggestion/LoginSuggestion';
import MessageResult from '../common/MessageResult/MessageResult';

const RegisterUser = () => {
  const dispatchAppStore = useAppDispatch();

  const [registerUser, { isLoading: registerUserLoading }] = useRegisterUserMutation();
  const [checkUniqueEmail, { error: uniqueEmailError }] = useCheckUniqueEmailMutation();

  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);

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
    resolver: yupResolver(SignUpUserValidationBody, { abortEarly: false, recursive: true }),
    mode: 'all',
    defaultValues: {
      email: searchParams?.get('email-social') || '',
    },
  });

  useEffect(() => {
    if (watch('email') === '') return;

    const timeout = setTimeout(() => {
      checkUniqueEmail({ email: watch('email') });
    }, 1500);

    return () => clearTimeout(timeout);
  }, [checkUniqueEmail, watch('email'), errors.email?.message, watch]);

  const sendNotificationSuccess = useCallback(() => {
    toastifySuccess('Have a great journey!');
    if (searchParams?.get('add-job') === 'true') {
      router.replace('/add-job');
    } else {
      router.replace('/?new-user=true');
    }
  }, [router, searchParams]);

  const registerNewUserHandler = async (user: RegisterUserModel) => {
    try {
      const newUser = await registerUser(user).unwrap();
      reset();
      dispatchAppStore(userDataActions.saveLoggedInUser(newUser.user));

      showResultSuccessMessage('User registered successfully!');
      sendNotificationSuccess();
    } catch (err: any) {
      Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
      reset({ password: '', passwordConfirm: '' });
      if (typeGuardGeneralError(err)) {
        showResultErrorMessage(err.data.message);
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
      }
    }
  };

  const onSubmitHandler = (data: RegisterUserModel) => {
    registerNewUserHandler(data);
  };

  const googleAuthHandler = async () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/google`, '_self');
  };

  return (
    <div className="flex flex-col">
      <Card>
        <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
          {searchParams?.get('add-job') === 'true' ? (
            <h2 className="block w-full">Register to add a job!</h2>
          ) : (
            <h2 className="block w-full">Lets register you!</h2>
          )}

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
            extraError={typeGuardGeneralError(uniqueEmailError) ? uniqueEmailError?.data.message : undefined}
          />

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
