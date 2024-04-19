'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import * as Sentry from '@sentry/nextjs';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditMyProfile } from '@/models/Profiles/EditProfileModel';
import EditMyProfileValidationBody from '@/validations/profiles/EditProfileValidationBody';
import { useFieldArray, useForm } from 'react-hook-form';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useUpdateMyProfileMutation } from '@/api/authenticationApi';
import { toastifyError, toastifySuccess } from '@/utils/helpers';
import { AiOutlineEdit } from 'react-icons/ai';
import { LocationPlace } from '@/models/Common/LocationPlace';
import { EditMyProfileValidationModel } from '@/validations/profiles/EditProfileValidationModel';
import { useGetAllTagsQuery } from '@/api/tagsApi';
import { createJobPostBackendTags } from '@/lib/jobPosts/jobPostsHelpers';
import { TagListName } from '@/models/Tags/TagList.type';
import { getJobTagsByCategory } from '@/lib/tags/tagsHelper';
import { TagEntity } from '@/models/Tags/TagEntity';
import EmailValidation from './Account/EmailValidation';
import FormInput from '../common/Form/FormInput';
import FormWrapper from '../common/Form/FormWrapper';
import Button from '../common/Button/Button';
import MessageResult from '../common/MessageResult/MessageResult';
import FormSelectAsyncCreate from '../common/Form/FormSelectAsyncCreate';
import FormTextarea from '../common/Form/FormTextarea';
// import ProfileEditEmployments from './ProfileEditEmployment';
// import ProfileEditEducation from './ProfileEditEducation';
// import ProfileEditSideProjects from './ProfileEditSideProjects';
import ProfileEditEducationController from './ProfileEditEducationController';
import ProfileEditEmploymentController from './ProfileEditEmploymentController';
import ProfileEditSideProjectsController from './ProfileEditSideProjectsController';

// TODO: Need to check the disabled buttons
// TODO: Add Sortable MultiSelect example ( drag and drop options) - https://react-select.com/advanced

// TODO: Set the languages from the backend ( it should take the tags when getting the profile)
// ! TODO: Check the md editor for the textareas ( https://uiwjs.github.io/react-md-editor/ )
const ProfileEdit = () => {
  const { loggedInUser } = useAppSelector((state) => state.userData);
  // console.log('loggedInUser', loggedInUser);
  const [profileTags, setProfileTags] = useState<{
    techTags: TagEntity[];
    languagesTags: TagEntity[];
    jobRolesTags: TagEntity[];
    yearsOfExperienceTags: TagEntity[];
  }>();

  // const { tags: profileTags } = getJobTagsByCategory(loggedInUser.tags || []);

  // const profileLanguagesTags = profileTags.languagesTags?.map((tag) => {
  //   return { labelName: tag.labelName, value: tag.id };
  // });

  const { data: allTagsRes } = useGetAllTagsQuery(null);

  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(10);

  const [updateMyProfile, { isLoading: isLoadingUpdateData }] = useUpdateMyProfileMutation();

  const { tags: allTags } = getJobTagsByCategory(allTagsRes?.items || []);

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
    formState: { errors, dirtyFields, isSubmitted, touchedFields },
    // reset,
    watch,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(EditMyProfileValidationBody, { abortEarly: false, recursive: true }),
    mode: 'all',

    defaultValues: {},
  });

  const {
    fields: fieldsEducation,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'educations',
    keyName: 'id',
  });
  const {
    fields: fieldsEmployment,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: 'employments',
    keyName: 'id',
  });
  const {
    fields: fieldsSideProject,
    append: appendSideProject,
    remove: removeSideProject,
  } = useFieldArray({
    control,
    name: 'sideProjects',
    keyName: 'id',
  });
  // console.log("fields", fields.map(field=>field.))

  useEffect(() => {
    const { tags: profileTagsWithCategory } = getJobTagsByCategory(loggedInUser.tags || []);
    setProfileTags(profileTagsWithCategory);
  }, [loggedInUser]);

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
      profileTags?.languagesTags.map((lang: TagEntity) => ({ label: lang.labelName, value: lang.id }))
    );
    setValue(
      'techTags',
      profileTags?.techTags.map((tech: TagEntity) => ({ label: tech.labelName, value: tech.id }))
    );

    setValue('website', loggedInUser.website);
    setValue('linkedin', loggedInUser.linkedin);
    setValue('github', loggedInUser.github);
    setValue('twitter', loggedInUser.twitter);
    setValue('desiredRoleTag', { label: loggedInUser.desiredRole?.labelName, value: loggedInUser.desiredRole?.id });
    setValue(
      'jobRolesTags',
      profileTags?.jobRolesTags?.map((role) => ({ label: role.labelName, value: role.id }))
    );
    const profileYearsExperience = profileTags?.yearsOfExperienceTags?.map((tag) => ({
      label: tag.labelName,
      value: tag.id,
    }));
    if (profileYearsExperience?.[0]) {
      setValue('yearsOfExperienceTag', profileYearsExperience[0]);
    }
    setValue('bio', loggedInUser.bio);
    setValue('preferredMinHourRate', loggedInUser.preferredMinHourRate);
  }, [loggedInUser, setValue, profileTags]);

  const updateUserProfileData = async (userProfileData: EditMyProfile) => {
    try {
      await updateMyProfile(userProfileData).unwrap();
      showResultSuccessMessage('Profile updated successfully!');
      toastifySuccess('Profile updated successfully!');
    } catch (err: any) {
      Sentry.captureMessage(JSON.stringify(err, null, 2), 'error');
      if ('data' in err) {
        showResultErrorMessage(err.data.message);
        // toastifyError(err.data.message);
        toastifyError('Something Went Wrong! Please try again!');
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
        toastifyError('Something Went Wrong! Please try again!');
      }
    }
  };

  const onSubmitHandler = (data: EditMyProfileValidationModel) => {
    console.log('data', data);
    const profileTechTags = createJobPostBackendTags(TagListName.TECH_SKILL, data.techTags);
    const updatedProfileLanguagesTags = createJobPostBackendTags(TagListName.LANGUAGE, data.languagesTags);
    const updatedProfileDesiredRoleTag = createJobPostBackendTags(
      TagListName.JOB_ROLE,
      data.desiredRoleTag ? [data.desiredRoleTag] : []
    );
    const updatedProfileJobRolesTags = createJobPostBackendTags(TagListName.JOB_ROLE, data.jobRolesTags);
    const updatedProfileYearsOfExperienceTags = createJobPostBackendTags(
      TagListName.YEARS_EXPERIENCE,
      data.yearsOfExperienceTag ? [data.yearsOfExperienceTag] : []
    );

    const updatedProfileTags = [
      ...profileTechTags,
      ...updatedProfileLanguagesTags,
      ...updatedProfileJobRolesTags,
      ...updatedProfileYearsOfExperienceTags,
    ];

    const updatedUserProfileData: EditMyProfile = {
      ...data,
      location: data.location?.label,
      nationality: data.nationality?.label,
      tags: updatedProfileTags,
      desiredRole: updatedProfileDesiredRoleTag[0],
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

  // const handleRemoveField = (index: number) => {
  //   remove(index);
  // };

  // errors, dirtyFields, isSubmitted, touchedFields
  return (
    <div className="flex flex-col items-start justify-start">
      <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)} addStyles="max-w-[800px]">
        <h4 className="w-full text-[var(--color-blue-light)]">General</h4>
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
          options={allTags.languagesTags}
          inputValueField="languagesTags"
          selectOptionField="id"
          selectOptionLabel="labelName"
          label="Languages"
          watchField={watch('languagesTags')}
          submitted={isSubmitted}
          isSearchable={true}
          isMulti={true}
        />
        <FormSelectAsyncCreate
          control={control}
          options={allTags.techTags}
          inputValueField="techTags"
          selectOptionField="id"
          selectOptionLabel="labelName"
          label="Skills"
          watchField={watch('techTags')}
          submitted={isSubmitted}
          isSearchable={true}
          isMulti={true}
        />
        <h4 className="w-full text-[var(--color-blue-light)]">Socials</h4>
        <FormInput
          register={register}
          placeholder="www.typingmucle.com"
          type="text"
          name="website"
          id="website"
          label="Website"
          control={control}
          errors={errors.website?.message}
          dirtyField={dirtyFields.website}
          watchField={watch('website')}
          submitted={isSubmitted}
          hasInputIcon={true}
          inputIconActive={<AiOutlineEdit />}
          inputIconInactive={<AiOutlineEdit />}
        />
        <FormInput
          register={register}
          placeholder="www.linkedin.com/in/username"
          type="text"
          name="linkedin"
          id="linkedin"
          label="LinkedIn"
          control={control}
          errors={errors.linkedin?.message}
          dirtyField={dirtyFields.linkedin}
          watchField={watch('linkedin')}
          submitted={isSubmitted}
          hasInputIcon={true}
          inputIconActive={<AiOutlineEdit />}
          inputIconInactive={<AiOutlineEdit />}
        />
        <FormInput
          register={register}
          placeholder="www.github.com/username"
          type="text"
          name="github"
          id="github"
          label="GitHub"
          control={control}
          errors={errors.github?.message}
          dirtyField={dirtyFields.github}
          watchField={watch('github')}
          submitted={isSubmitted}
          hasInputIcon={true}
          inputIconActive={<AiOutlineEdit />}
          inputIconInactive={<AiOutlineEdit />}
        />
        <FormInput
          register={register}
          placeholder="www.twitter.com/username"
          type="text"
          name="twitter"
          id="twitter"
          label="Twitter"
          control={control}
          errors={errors.twitter?.message}
          dirtyField={dirtyFields.twitter}
          watchField={watch('twitter')}
          submitted={isSubmitted}
          hasInputIcon={true}
          inputIconActive={<AiOutlineEdit />}
          inputIconInactive={<AiOutlineEdit />}
        />

        {/* <FormInput
          register={register}
          placeholder="4"
          type="number"
          name="experience"
          id="experience"
          label="Years of Experience"
          control={control}
          errors={errors.experience?.message}
          dirtyField={dirtyFields.experience}
          watchField={watch('experience')}
          submitted={isSubmitted}
          hasInputIcon={true}
          inputIconActive={<AiOutlineEdit />}
          inputIconInactive={<AiOutlineEdit />}
        /> */}
        <h4 className="w-full text-[var(--color-blue-light)]">Experience</h4>
        <FormSelectAsyncCreate
          control={control}
          options={allTags.jobRolesTags}
          inputValueField="desiredRoleTag"
          selectOptionField="id"
          selectOptionLabel="labelName"
          label="Desired Main Role"
          watchField={watch('desiredRoleTag')}
          submitted={isSubmitted}
          isSearchable={false}
          isMulti={false}
        />
        <FormSelectAsyncCreate
          control={control}
          options={allTags.jobRolesTags}
          inputValueField="jobRolesTags"
          selectOptionField="id"
          selectOptionLabel="labelName"
          label="Open to other roles"
          watchField={watch('jobRolesTags')}
          submitted={isSubmitted}
          isSearchable={true}
          isMulti={true}
        />
        <div className="flex w-full flex-row flex-wrap">
          <div className="flex-grow sm:mr-4">
            <FormSelectAsyncCreate
              control={control}
              options={allTags.yearsOfExperienceTags}
              inputValueField="yearsOfExperienceTag"
              selectOptionField="id"
              selectOptionLabel="labelName"
              label="Years Of Experience"
              watchField={watch('yearsOfExperienceTag')}
              submitted={isSubmitted}
              isSearchable={false}
              isMulti={false}
              styling="min-w-[200px]"
            />
          </div>
          <div className="flex min-w-[200px] flex-grow  flex-col">
            <FormInput
              register={register}
              placeholder="33"
              type="number"
              name="preferredMinHourRate"
              id="preferredMinHourRate"
              label="Min Rate per Hour in $"
              control={control}
              errors={errors.preferredMinHourRate?.message}
              dirtyField={dirtyFields.preferredMinHourRate}
              watchField={watch('preferredMinHourRate')}
              submitted={isSubmitted}
              hasInputIcon={true}
              inputIconActive={<AiOutlineEdit />}
              inputIconInactive={<AiOutlineEdit />}
              styling="flex flex-col  flex-grow"
            />
          </div>
        </div>
        <FormTextarea
          register={register}
          placeholder="Bio about your experience..."
          type="text"
          name="bio"
          id="bio"
          label="About Me"
          styling="[&]:h-40 [&]:p-2 max-h-[400px] min-h-[100px]"
          required
          errors={errors.bio?.message}
          dirtyField={dirtyFields.bio}
          watchField={watch('bio')}
          submitted={isSubmitted}
        />

        {/* <button onClick={handleAddField}>Add field</button> */}
        {/* <ul className="List">
          <li>
            <div>Title</div>
            <div>Company</div>
            <div>Start Year</div>
            <div>End Year</div>
            <div>URL</div>
          </li>
        </ul>
        <div>Previous Experience</div>
        <div>Education</div>
        <div>Side Projects</div> */}
        <div className="block w-full">
          <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
            Update Profile
          </Button>
        </div>
      </FormWrapper>
      <MessageResult isLoadingAction={isLoadingUpdateData} isError={isMessageError} message={resultMessageDisplay} />

      <h4 className="mt-8 w-full text-[var(--color-blue-light)]">Previous Experiences</h4>
      <ProfileEditEmploymentController
        fields={fieldsEmployment}
        append={appendEmployment}
        remove={removeEmployment}
        register={register}
        control={control}
        errors={errors}
        dirtyFields={dirtyFields}
        isSubmitted={isSubmitted}
        watch={watch}
        touchedFields={touchedFields}
        onSubmitHandler={handleSubmit(onSubmitHandler)}
      />
      {/* <ProfileEditEmployments /> */}

      {/* ProfileEditEmploymentController */}

      <h4 className="mt-8 w-full text-[var(--color-blue-light)]">Education</h4>
      <ProfileEditEducationController
        fields={fieldsEducation}
        append={appendEducation}
        remove={removeEducation}
        register={register}
        control={control}
        errors={errors}
        dirtyFields={dirtyFields}
        isSubmitted={isSubmitted}
        watch={watch}
        touchedFields={touchedFields}
        onSubmitHandler={handleSubmit(onSubmitHandler)}
      />

      {/* <h4 className="mt-8 w-full text-[var(--color-blue-light)]">Education</h4>
      <ProfileEditEducation /> */}

      <h4 className="mt-8 w-full text-[var(--color-blue-light)]">Side Projects</h4>
      {/* <ProfileEditSideProjects /> */}
      <ProfileEditSideProjectsController
        fields={fieldsSideProject}
        append={appendSideProject}
        remove={removeSideProject}
        register={register}
        control={control}
        errors={errors}
        dirtyFields={dirtyFields}
        isSubmitted={isSubmitted}
        watch={watch}
        touchedFields={touchedFields}
        onSubmitHandler={handleSubmit(onSubmitHandler)}
      />
    </div>
  );
};

export default ProfileEdit;
