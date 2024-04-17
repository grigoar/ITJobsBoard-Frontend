'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import * as Sentry from '@sentry/nextjs';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditMyProfile } from '@/models/Profiles/EditProfileModel';
import EditMyProfileValidationBody from '@/validations/profiles/EditProfileValidationBody';
import { useForm } from 'react-hook-form';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useUpdateMyProfileMutation } from '@/api/authenticationApi';
import { toastifyError, toastifySuccess } from '@/utils/helpers';
import { AiOutlineEdit } from 'react-icons/ai';
import { LocationPlace } from '@/models/Common/LocationPlace';
import { EditMyProfileValidationModel } from '@/validations/profiles/EditProfileValidationModel';
import useGetJobTagsByCategory from '@/hooks/jobPosts/useGetJobTagsByCategory';
import { useGetAllTagsQuery } from '@/api/tagsApi';
import { createJobPostBackendTags } from '@/lib/jobPosts/jobPostsHelpers';
import { TagListName } from '@/models/Tags/TagList.type';
import EmailValidation from './Account/EmailValidation';
import FormInput from '../common/Form/FormInput';
import FormWrapper from '../common/Form/FormWrapper';
import Button from '../common/Button/Button';
import MessageResult from '../common/MessageResult/MessageResult';
import FormSelectAsyncCreate from '../common/Form/FormSelectAsyncCreate';

// TODO: Need to check the disabled buttons

// TODO: Set the languages from the backend ( it should take the tags when getting the profile)
const ProfileEdit = () => {
  const { loggedInUser } = useAppSelector((state) => state.userData);
  console.log('loggedInUser', loggedInUser);
  const { data: allTagsRes } = useGetAllTagsQuery(null);

  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(10);

  const [updateMyProfile, { isLoading: isLoadingUpdateData }] = useUpdateMyProfileMutation();

  const { tags } = useGetJobTagsByCategory(allTagsRes?.items || []);

  const [googlePlacesLocation, setGooglePlacesLocation] = useState<LocationPlace[]>([]);
  const [googlePlacesNationality, setGooglePlacesNationality] = useState<LocationPlace[]>([]);

  // ? https://developers.google.com/maps/documentation/javascript/place-autocomplete#constrain-place-types
  const { placePredictions: placePredictionsLocation, getPlacePredictions: getPlacePredictionsLocation } =
    usePlacesService({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      debounce: 500,
      options: {
        // types: ['continent', 'country'],
        types: ['(regions)'],
      },
    });
  const { placePredictions: placePredictionsNationality, getPlacePredictions: getPlacePredictionsNationality } =
    usePlacesService({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      debounce: 500,
      options: {
        types: ['country'],
        // types: ['(regions)'],
      },
    });

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

  useEffect(() => {
    if (placePredictionsLocation.length === 0) return;

    const placesStrings = placePredictionsLocation.map((place) => {
      return {
        label: place.description,
        id: place.place_id,
        name: place.structured_formatting.main_text,
      };
    });

    setGooglePlacesLocation(placesStrings);
  }, [placePredictionsLocation]);

  useEffect(() => {
    if (placePredictionsNationality.length === 0) return;

    const placesStrings = placePredictionsNationality.map((place) => {
      return {
        label: place.description,
        id: place.place_id,
        name: place.structured_formatting.main_text,
      };
    });

    setGooglePlacesNationality(placesStrings);
  }, [placePredictionsNationality]);

  useEffect(() => {
    setValue('firstName', loggedInUser.firstName);
    setValue('lastName', loggedInUser.lastName);
    setValue('location', { label: loggedInUser.location, value: loggedInUser.location });
    setValue('nationality', { label: loggedInUser.nationality, value: loggedInUser.nationality });
    setValue(
      'languagesTags',
      loggedInUser.languages?.map((lang) => ({ labelName: lang, value: lang }))
    );
  }, [loggedInUser, setValue]);

  const updateUserProfileData = async (userProfileData: EditMyProfile) => {
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

  const onSubmitHandler = (data: EditMyProfileValidationModel) => {
    console.log('data', data);
    const profileTechTags = createJobPostBackendTags(TagListName.TECH_SKILL, data.techTags);
    const profileLanguagesTags = createJobPostBackendTags(TagListName.LANGUAGE, data.languagesTags);

    const profileTags = [...profileTechTags, ...profileLanguagesTags];

    const updatedUserProfileData: EditMyProfile = {
      ...data,
      location: data.location?.label,
      nationality: data.nationality?.label,
      tags: profileTags,
    };
    // reset();
    updateUserProfileData(updatedUserProfileData);
  };

  const onLocationInputChange = (inputValue: string) => {
    getPlacePredictionsLocation({ input: inputValue });
  };
  const onNationalityInputChange = (inputValue: string) => {
    getPlacePredictionsNationality({ input: inputValue });
  };

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
          hasInputIcon={true}
          inputIconActive={<AiOutlineEdit />}
          inputIconInactive={<AiOutlineEdit />}
        />
        <FormInput
          register={register}
          placeholder="Doey"
          type="text"
          name="lastName"
          id="lastName"
          label="Last Name"
          control={control}
          errors={errors.lastName?.message}
          dirtyField={dirtyFields.lastName}
          watchField={watch('lastName')}
          submitted={isSubmitted}
          hasInputIcon={true}
          inputIconActive={<AiOutlineEdit />}
          inputIconInactive={<AiOutlineEdit />}
        />
        <FormSelectAsyncCreate
          control={control}
          options={googlePlacesLocation}
          inputValueField="location"
          selectOptionField="id"
          selectOptionLabel="label"
          label="Location"
          watchField={watch('location')}
          errors={errors.location?.label?.message}
          submitted={isSubmitted}
          isSearchable={true}
          onInputChange={onLocationInputChange}
          selectPlaceholder="Add a job location..."
        />
        <FormSelectAsyncCreate
          control={control}
          options={googlePlacesNationality}
          inputValueField="nationality"
          selectOptionField="id"
          selectOptionLabel="label"
          label="Nationality"
          watchField={watch('location')}
          errors={errors.nationality?.label?.message}
          submitted={isSubmitted}
          isSearchable={true}
          onInputChange={onNationalityInputChange}
          selectPlaceholder="Germany"
        />
        <FormSelectAsyncCreate
          control={control}
          options={tags.languagesTags}
          inputValueField="languagesTags"
          selectOptionField="id"
          selectOptionLabel="labelName"
          label="Languages"
          watchField={watch('languagesTags')}
          submitted={isSubmitted}
          isSearchable={true}
          isMulti={true}
        />
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
      <MessageResult isLoadingAction={isLoadingUpdateData} isError={isMessageError} message={resultMessageDisplay} />
    </div>
  );
};

export default ProfileEdit;
