'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import * as Sentry from '@sentry/nextjs';
// import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditMyProfileModel } from '@/models/Profiles/EditProfileModel';
import EditMyProfileValidationBody from '@/validations/profiles/EditProfileValidationBody';
import { useForm } from 'react-hook-form';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useUpdateMyProfileMutation } from '@/api/authenticationApi';
import { toastifyError, toastifySuccess } from '@/utils/helpers';
import EmailValidation from './Account/EmailValidation';
import FormInput from '../common/Form/FormInput';
import FormWrapper from '../common/Form/FormWrapper';
import Button from '../common/Button/Button';
import MessageResult from '../common/MessageResult/MessageResult';

const ProfileEdit = () => {
  const { loggedInUser } = useAppSelector((state) => state.userData);

  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(10);

  const [updateMyProfile, { isLoading: isLoadingUpdateData }] = useUpdateMyProfileMutation();

  // const { placePredictions, getPlacePredictions } = usePlacesService({
  //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   debounce: 500,
  //   options: {
  //     types: ['(regions)'],
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitted },
    // reset,
    watch,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(EditMyProfileValidationBody, { abortEarly: false, recursive: true }),
    mode: 'all',

    defaultValues: {},
  });

  const updateUserProfileData = async (userProfileData: EditMyProfileModel) => {
    try {
      await updateMyProfile(userProfileData).unwrap();
      showResultSuccessMessage('Profile updated successfully!');
      toastifySuccess('Profile updated successfully!');
    } catch (err: any) {
      Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
      if ('data' in err) {
        showResultErrorMessage(err.data.message);
        toastifyError(err.data.message);
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
        toastifyError('Something Went Wrong! Please try again!');
      }
    }
  };

  const onSubmitHandler = (data: EditMyProfileModel) => {
    console.log('data', data);
    // reset();
    updateUserProfileData(data);
  };

  useEffect(() => {
    setValue('firstName', loggedInUser.firstName);
    setValue('lastName', loggedInUser.lastName);
  }, [loggedInUser, setValue]);

  return (
    <div className="flex flex-col items-start justify-start">
      <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)} addStyles="max-w-[800px]">
        <div>Avatar</div>
        <div className="w-full">
          <EmailValidation emailValidated={loggedInUser.emailValidated} userEmail={loggedInUser.email} />
        </div>
        <FormInput
          register={register}
          placeholder="John"
          type="text"
          name="firstName"
          id="firstName"
          label="First Name"
          control={control}
          errors={errors.firstName?.message}
          dirtyField={dirtyFields.firstName}
          watchField={watch('firstName')}
          submitted={isSubmitted}
        />
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
        <div className="block w-full">
          <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
            Update Profile
          </Button>
        </div>
      </FormWrapper>
      <MessageResult
        isLoadingAction={isLoadingUpdateData}
        isError={isMessageError}
        message={resultMessageDisplay}
        maxWidth={'450px'}
      />
    </div>
  );
};

export default ProfileEdit;
