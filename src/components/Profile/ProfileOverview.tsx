'use client';

import { useAppSelector } from '@/store/hooks';
import EmailValidation from './Account/EmailValidation';

const ProfileOverview = () => {
  const { loggedInUser } = useAppSelector((state) => state.userData);
  return (
    <div className="flex flex-col items-start justify-start">
      <div>Avatar</div>
      <EmailValidation emailValidated={loggedInUser.emailValidated} userEmail={loggedInUser.email} />
      <div>FirstName</div>
      <div>LastName</div>
      <div>Location</div>
      <div>Nationality</div>
      <div>Languages</div>
      <div>Socials:</div>
      <div>Website</div>
      <div>LinkedIn</div>
      <div>GitHub</div>
      <div>Twitter</div>
      <div>Experience</div>
      <div>Bio about your experience</div>
      <div>Employments</div>
      <div>Skills</div>
      <div>Education</div>
      <div>Side Projects</div>
      <div>Min hour Rate desired</div>
    </div>
  );
};

export default ProfileOverview;
