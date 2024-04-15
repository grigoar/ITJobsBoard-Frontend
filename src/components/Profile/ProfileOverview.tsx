'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import EmailValidation from './Account/EmailValidation';

// TODO: Add event emitter to send email to user for welcome and email validation
// TODO: Add Nested Layout for navigation
// TODO: Add email validation button and styling the button
// TODO: Add forgot password page and functionality
const ProfileOverview = () => {
  const { loggedInUser } = useAppSelector((state) => state.userData);
  return (
    <div className="flex flex-col items-start justify-start">
      <h1>Profile Overview</h1>
      <EmailValidation emailValidated={loggedInUser.emailValidated} userEmail={loggedInUser.email} />
    </div>
  );
};

export default ProfileOverview;
