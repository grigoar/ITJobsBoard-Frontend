'use client';

import { useLoginUserMutation, useLogoutCurrentUserMutation } from '@/api/authenticationApi';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { typeGuardGeneralError } from '@/models/Errors/typeguards';
import { FederatedAccountError } from '@/models/Users/FederatedAccountError';
import { FederatedCredentialsIssuer } from '@/models/Users/FederatedCredentialsIssuer';
import LoginUserModel from '@/models/Users/LoginUserModel';
import { useAppDispatch } from '@/store/hooks';
import { userDataActions } from '@/store/slices/userDataSlice';
import { toastifySuccess } from '@/utils/helpers';
import LoginUserValidationBody from '@/validations/users/LoginUserValidationBody';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormInput from '../common/Form/FormInput';
import FormWrapper from '../common/Form/FormWrapper';
import PasswordIconOverInputActive from '../common/Form/PasswordIconOverInput/PasswordIconOverInputActive';
import PasswordIconOverInputInactive from '../common/Form/PasswordIconOverInput/PasswordIconOverInputInactive';
import LoginSuggestion from '../common/LogInSuggestion/LoginSuggestion';
import MessageResult from '../common/MessageResult/MessageResult';

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
    control,
  } = useForm({
    resolver: yupResolver(LoginUserValidationBody, { abortEarly: false, recursive: true }),
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
      reset();
    } catch (err: any) {
      reset({ password: '' });
      if (typeGuardGeneralError(err)) {
        showResultErrorMessage(err?.data?.message);

        if (err?.data?.err?.extra?.email) {
          setFederatedAccount({
            isFederated: err?.data?.err?.extra?.isFederated,
            email: err?.data?.err?.extra?.email,
            issuer: err?.data?.err?.extra?.issuer,
          });
        }
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
      }
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

          <FormInput
            register={register}
            placeholder="john.doe@gmail.com"
            type="email"
            name="email"
            id="email"
            label="Email"
            required={true}
            control={control}
            errors={errors.email?.message}
            dirtyField={dirtyFields.email}
            watchField={watch('email')}
            submitted={isSubmitted}
          />

          <div className={'classesLogin.formControlEmail flex w-full flex-col'}>
            <FormInput
              register={register}
              placeholder="***********"
              type="password"
              name="password"
              id="password"
              label="Password"
              required
              control={control}
              errors={errors.password?.message}
              dirtyField={dirtyFields.password}
              watchField={watch('password')}
              submitted={isSubmitted}
              hasInputIcon={true}
              inputIconActive={<PasswordIconOverInputActive />}
              inputIconInactive={<PasswordIconOverInputInactive />}
            />
            <Button
              link="/forgot-password"
              style={
                'classesLogin.forgotPasswordLink text-sm text-[var(--text-color-primary)]  hover:brightness-[80%] text-right '
              }
            >
              Forgot Password?
            </Button>
          </div>

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
