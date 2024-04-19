'use client';

import { useConfirmEmailMutation } from '@/api/authenticationApi';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import constants from '@/utils/constants';
import MessageResult from '@/components/common/MessageResult/MessageResult';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

type EmailValidationProps = {
  emailValidated: boolean;
  userEmail: string;
};

// TODO: Improve styling
// TODO: Style better the button
// TODO: Investigate why the form submit with enter key is not working
// TODO: Add an option to change the email if it is wrong - link to change email settings
const EmailValidation = ({ emailValidated, userEmail }: EmailValidationProps) => {
  const [emailInput, setEmailInput] = useState(userEmail);
  const [isButtonValidationDisabled, setIsButtonValidationDisabled] = useState(false);
  const [countdown, setCountdown] = useState(constants.INACTIVE_COUNTDOWN_TIMER_VALUE);
  const [validateDisabledTimerText, setValidateDisabledTimerText] = useState<string>('');

  const [confirmEmail, { isLoading: isConfirmingEmail }] = useConfirmEmailMutation();
  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(10);

  useEffect(() => {
    setEmailInput(userEmail);
  }, [userEmail]);

  // set countdown timer for validation button
  useEffect(() => {
    if (countdown === constants.INACTIVE_COUNTDOWN_TIMER_VALUE) return;

    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        // * calculate time left
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown - minutes * 60;
        const timeLeft = `${minutes > 0 ? `${minutes % 60}m` : ''} ${seconds > 0 ? `${seconds % 60}s` : ''}`;
        setValidateDisabledTimerText(timeLeft);
        setIsButtonValidationDisabled(true);
        setCountdown(countdown - 1);
      } else {
        setIsButtonValidationDisabled(false);
        setValidateDisabledTimerText('');
        setCountdown(constants.INACTIVE_COUNTDOWN_TIMER_VALUE);
      }
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [countdown]);

  const confirmEmailUserHandler = async () => {
    try {
      setIsButtonValidationDisabled(true);
      setCountdown(constants.COUNTDOWN_TIMER_BUTTON_DISABLED);
      await confirmEmail().unwrap();
      showResultSuccessMessage('Validation Email Sent! It might take a few minutes to arrive.');
    } catch (err: any) {
      Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
      if ('data' in err) {
        showResultErrorMessage(err.data.message);
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
      }
    }
  };

  const confirmMailHandler = () => {
    confirmEmailUserHandler();
  };

  return (
    <div>
      {/* <h1>Email Validation</h1> */}
      {/* <Button style={`btn btn-ghost `} action={confirmMailHandler}>
        Confirm Email
      </Button> */}
      {/* {isConfirmingEmail && <p>Confirming Email...</p>} */}
      <div className={'classes.emailFieldValue'}>
        <label htmlFor="email" className={'classes.inactiveEmailLabel'}>
          Email
        </label>
        <div className={'classes.inactiveEmailInputContainer relative'}>
          <input
            type="email"
            name="email"
            placeholder="email"
            id="email"
            disabled={true}
            value={emailInput}
            className={`${'classes.emailInput'} ${'classes.formControlInput'} w-[calc(100%-30px)] rounded-md border-2 ${!emailValidated ? 'border-red-300' : 'border-[var(--color-green-light)]'} bg-slate-300 p-2 text-[var(--color-grey-dark-4)]`}
          />
          <div className={'classes.emailValidatedIcon absolute right-0 top-[50%] translate-y-[-50%] transform'}>
            {emailValidated ? (
              <AiOutlineCheck className={'classes.validatedEmail text-[var(--color-green-light)]'} />
            ) : (
              <AiOutlineClose className={'classes.emailNotValid text-[var(--color-red-light)]'} />
            )}
          </div>
        </div>
      </div>
      {!emailValidated && (
        <button
          type="button"
          onClick={confirmMailHandler}
          disabled={emailValidated || isButtonValidationDisabled}
          className={`buttonValidateEmailClasses  relative mb-4 ${countdown > 0 ? 'btnDisabled' : 'btn btn-ghost'}`}
        >
          Validate Email
          <div
            className={`classes.validateTimerText absolute bottom-0 right-[50%] translate-x-[50%] translate-y-[130%] transform `}
          >
            {validateDisabledTimerText}
          </div>
        </button>
      )}
      <MessageResult isLoadingAction={isConfirmingEmail} isError={isMessageError} message={resultMessageDisplay} />
    </div>
  );
};

export default EmailValidation;
