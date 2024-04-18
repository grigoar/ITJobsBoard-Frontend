'use client';

import React, { useCallback, useEffect, useState } from 'react';
// import { usePlacesWidget } from 'react-google-autocomplete';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useRouter, useSearchParams } from 'next/navigation';
import { toastifySuccess } from '@/utils/helpers';
import AddJobPostValidationBody from '@/validations/jobPosts/AddJobPostValidationBody';
import AddJobPostModel from '@/models/JobPosts/AddJobPostModel';
import { useAddNewJobPostMutation } from '@/api/jobPostsApi';
import { typeGuardGeneralError } from '@/models/Errors/typeguards';
import { useGetAllProfileCompaniesQuery } from '@/api/profilesApi';
import { useAppSelector } from '@/store/hooks';
import { CompanyEntity } from '@/models/Companies/CompanyEntity';
import { useGetAllTagsQuery } from '@/api/tagsApi';
import { TagListName } from '@/models/Tags/TagList.type';
import { LocationPlace } from '@/models/Common/LocationPlace';
import AddJobPostValidationModel from '@/validations/jobPosts/AddJobPostValidationModel';
import { createJobPostBackendTags } from '@/lib/jobPosts/jobPostsHelpers';
import constants from '@/utils/constants';
import { getJobTagsByCategory } from '@/lib/tags/tagsHelper';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';
import FormTextarea from '../common/Form/FormTextarea';
import FormSelect from '../common/Form/FormSelect';
import FormSelectAsyncCreate from '../common/Form/FormSelectAsyncCreate';
import UploadCompanyLogo from './UploadCompanyLogo';

// TODO: check the refresh page and the theme
// TODO: Maybe check the styling for select, but it should work fine for now
// TODO: Add a role to the user that can edit a company if it is the owner
// TODO: Create a profile for a company so it can be edited without the user logging in ( some email and token for the authorization)

// TODO: Some issue with the location validation when it is empty ( it needs to be added, because it is required)
// TODO: Maybe give a scale for the experience level tags(1-100)
// TODO: Add capability for moving the multiple select options (https://react-select.netlify.app/advanced)

const AddJobPost = () => {
  const [addNewJobPost, { isLoading }] = useAddNewJobPostMutation();
  const { data: allTagsRes } = useGetAllTagsQuery(null);

  const { loggedInUser } = useAppSelector((state) => state.userData);
  // TODO: Change the endpoint to get the companies for a logged in user
  const { data: userCompaniesRes } = useGetAllProfileCompaniesQuery(loggedInUser.id, { skip: loggedInUser.id === '' });
  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);
  const [isButtonLoginDisabled, setIsButtonLoginDisabled] = useState(false);
  const [companySelectedOption, setCompanySelectedOption] = useState<CompanyEntity | null>(null);

  const [profileCompanies, setProfileCompanies] = useState<CompanyEntity[]>([]);
  const [googlePlaces, setGooglePlaces] = useState<LocationPlace[]>([]);
  const { tags } = getJobTagsByCategory(allTagsRes?.items || []);

  const [isNewCompanyNeeded, setIsNewCompanyNeeded] = useState(true);
  const [isUserAddingNewCompany, setIsUserAddingNewCompany] = useState(false);
  const [imgMultipartPreview, setImgMultipartPreview] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    debounce: 500,
    options: {
      types: ['(regions)'],
    },
  });

  useEffect(() => {
    if (placePredictions.length === 0) return;

    const placesStrings = placePredictions.map((place) => {
      return {
        label: place.description,
        id: place.place_id,
        name: place.structured_formatting.main_text,
      };
    });

    setGooglePlaces(placesStrings);
  }, [placePredictions]);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitted },
    reset,
    watch,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(AddJobPostValidationBody, { abortEarly: false, recursive: true }),
    mode: 'all',

    defaultValues: {
      color: constants.DEFAULT_COLOR_POST,
      title: 'Full Stack Developer',
      description: 'We are looking for a full stack developer to join our team',
      minSalary: 2000,
      maxSalary: 3000,
      location: {
        label: 'Cluj, Romania',
        value: 'ChIJiwtskR8MSUcR6Nk3QsedRkI',
      },
      techTags: [
        {
          label: 'React',
          value: 'a39480dd-26cd-4b40-bfcd-2c169893b1bf',
        },
        {
          label: 'Node.js',
          value: '872abf06-e39e-4abd-88dc-5008ac058ead',
        },
      ],
      seniorityTags: [
        {
          label: 'Senior',
          value: 'd0c91a7e-eae0-4f6b-9630-17894bf27d57',
        },
      ],
      employmentTypeTags: [
        {
          label: 'Part-time',
          value: 'e08c0e6a-ab92-4fa7-ad88-112544671217',
        },
      ],
      companySizeTag: {
        label: '1-10',
        value: '75ce19cc-f1ac-48ef-9bb2-54bd7b85ba77',
      },
      companyTypeTag: {
        label: 'Startup',
        value: '43e9f3a5-567d-4328-b5ed-dc4431136b41',
      },
      workLocationTag: {
        label: 'Remote',
        value: 'ab8d4da5-d168-44f2-9ccd-644684d2feb4',
      },
    },
  });

  useEffect(() => {
    setProfileCompanies(userCompaniesRes?.items || []);
    setCompanySelectedOption(userCompaniesRes?.items[0] || null);
    setIsNewCompanyNeeded(userCompaniesRes?.items?.length === 0 || !userCompaniesRes?.items);
    setIsUserAddingNewCompany(userCompaniesRes?.items?.length === 0 || !userCompaniesRes?.items);
  }, [userCompaniesRes, setValue]);

  // useEffect(() => {
  //   const {
  //     techTagsOnly,
  //     seniorityTagsOnly,
  //     employmentTypeTagsOnly,
  //     companySizeTagsOnly,
  //     companyTypeTagsOnly,
  //     workLocationTagsOnly,
  //     companyDomainTagsOnly,
  //     benefitsTagsOnly,
  //   } = getJobPostTagsByType(allTagsRes?.items || []);
  //   setTags({
  //     techTags: techTagsOnly,
  //     seniorityTags: seniorityTagsOnly,
  //     employmentTypeTags: employmentTypeTagsOnly,
  //     companySizeTags: companySizeTagsOnly,
  //     companyTypeTags: companyTypeTagsOnly,
  //     workLocationTags: workLocationTagsOnly,
  //     companyDomainTags: companyDomainTagsOnly,
  //     benefitsTags: benefitsTagsOnly,
  //   });
  // }, [allTagsRes, setTags]);

  useEffect(() => {
    if (companySelectedOption) {
      setValue('companyID', companySelectedOption.id);
      // TODO: This is not needed, because the company is selected or the user is adding a new company
      setValue('newCompany.name', companySelectedOption.name);
      setValue('newCompany.description', companySelectedOption.description);
      setValue('newCompany.email', companySelectedOption.email);
      setValue('newCompany.logoImage', companySelectedOption.logoImage);
      setValue('newCompany.websiteURL', companySelectedOption.websiteURL);
    }
  }, [companySelectedOption, setValue]);

  const sendNotificationSuccess = useCallback(() => {
    toastifySuccess('Job Post Added Successfully!');
    if (searchParams?.get('go-pro') === 'true') {
      router.replace('/go-pro');
    } else {
      router.replace('/?new-user=true');
    }
  }, [router, searchParams]);

  const changeImagePreviewHandler = (file: File | null) => {
    setImgMultipartPreview(file);
  };

  // const addNewJobPostHandler = async (jobPost: AddJobPostModel) => {
  const addNewJobPostHandler = async (jobPost: FormData) => {
    try {
      console.log('jobPost', jobPost);
      await addNewJobPost(jobPost).unwrap();
      // dispatchAppStore(userDataActions.saveLoggedInUser(userLoggedIn.user));

      showResultSuccessMessage('Job post created!');
      sendNotificationSuccess();
      setIsButtonLoginDisabled(true);
      // resetUsernameInput();
      // resetPasswordInput();
      reset();
    } catch (err: any) {
      // resetPasswordInput();
      // reset({ password: '' });
      if (typeGuardGeneralError(err)) {
        showResultErrorMessage(err?.data?.message);
      } else {
        showResultErrorMessage('Something Went Wrong! Please try again!');
      }
      // toastifyError('Login failed! Please try again!');
    }
  };

  const onSubmitHandler = (data: AddJobPostValidationModel) => {
    console.log('data', data);
    const jobTechTags = createJobPostBackendTags(TagListName.TECH_SKILL, data.techTags);
    const jobSeniorityTags = createJobPostBackendTags(TagListName.EXPERIENCE_LEVEL, data.seniorityTags);
    const jobEmploymentTypeTags = createJobPostBackendTags(TagListName.EMPLOYMENT_TYPE, data.employmentTypeTags);
    const jobCompanySizeTags = createJobPostBackendTags(
      TagListName.COMPANY_SIZE,
      data.companySizeTag != null ? [data.companySizeTag] : []
    );
    const jobCompanyTypeTag = createJobPostBackendTags(
      TagListName.COMPANY_TYPE,
      data.companyTypeTag != null ? [data.companyTypeTag] : []
    );
    const jobWorkLocationTag = createJobPostBackendTags(
      TagListName.WORK_PLACE,
      data.workLocationTag != null ? [data.workLocationTag] : []
    );
    const jobCompanyDomainTag = createJobPostBackendTags(
      TagListName.DOMAIN,
      data.companyDomainTag != null ? [data.companyDomainTag] : []
    );
    const jobBenefitsTags = createJobPostBackendTags(TagListName.BENEFITS, data.benefitsTags);

    const jobTags = [
      ...jobTechTags,
      ...jobSeniorityTags,
      ...jobEmploymentTypeTags,
      ...jobCompanySizeTags,
      ...jobCompanyTypeTag,
      ...jobWorkLocationTag,
      ...jobCompanyDomainTag,
      ...jobBenefitsTags,
    ];
    const jobPost: AddJobPostModel = {
      description: data.description,
      title: data.title,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      companyID: data.companyID,
      location: data.location?.label || '',
      tags: jobTags,
      color: data.color,
      isHighlighted: data.isHighlighted,
      isPremium: false,
      newCompany: data.newCompany,
    };

    const formData = new FormData();
    formData.append('description', jobPost.description);
    formData.append('title', jobPost.title);
    formData.append('minSalary', jobPost.minSalary?.toString() || '');
    formData.append('maxSalary', jobPost.maxSalary ? jobPost.maxSalary.toString() : '');
    formData.append('companyID', isUserAddingNewCompany ? '' : jobPost.companyID || '');
    formData.append('location', jobPost.location);
    formData.append('color', jobPost.color?.toString() || '');
    formData.append('isHighlighted', jobPost.isHighlighted ? 'true' : 'false');
    formData.append('isPremium', jobPost.isPremium ? 'true' : 'false');
    formData.append('newCompany', JSON.stringify(jobPost.newCompany));
    jobTags.forEach((tag) => {
      formData.append('tags', JSON.stringify(tag));
    });
    formData.append('companyLogo', imgMultipartPreview || '');

    // addNewJobPostHandler(jobPost);
    addNewJobPostHandler(formData);
  };

  const toggleAddNewCompanyHandler = () => {
    if (isNewCompanyNeeded) {
      setIsUserAddingNewCompany(true);
      return;
    }
    setIsUserAddingNewCompany((prev) => !prev);
  };

  const handleCompanyChange = (selectedOption: CompanyEntity | null) => {
    setCompanySelectedOption(selectedOption);
    // setCompaniesOptions(userCompaniesRes?.companies.map((company) => company.name) || []);
  };

  const textExistingCompany = () => {
    if ((isUserAddingNewCompany && userCompaniesRes?.items?.length === 0) || !userCompaniesRes?.items) {
      return 'Add New Company';
    }
    if (!isNewCompanyNeeded && isUserAddingNewCompany && userCompaniesRes?.items?.length > 0) {
      return 'Select Existing Company';
    }
    if (userCompaniesRes?.items?.length === 0 || !userCompaniesRes?.items) {
      return 'Add New Company';
    }
    return 'Add New Company';
  };

  const onLocationInputChange = (inputValue: string) => {
    getPlacePredictions({ input: inputValue });
  };

  return (
    <div className="flex flex-col">
      <Card className="max-w-[800px]">
        <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)} addStyles="max-w-[800px]">
          <h2>Lets post a new job!</h2>

          <FormTextarea
            register={register}
            placeholder="Add a job description here..."
            type="description"
            name="description"
            id="description"
            label="Description"
            styling="[&]:h-40 [&]:p-0 max-h-[400px] min-h-[100px]"
            required
            errors={errors.description?.message}
            dirtyField={dirtyFields.description}
            watchField={watch('description')}
            submitted={isSubmitted}
          />

          <FormInput
            register={register}
            placeholder="Add a job title here..."
            type="title"
            name="title"
            id="title"
            label="Title"
            required
            control={control}
            errors={errors.title?.message}
            dirtyField={dirtyFields.title}
            watchField={watch('title')}
            submitted={isSubmitted}
          />

          <div className="flex w-full gap-4">
            <div className="flex w-full flex-col">
              <FormInput
                register={register}
                placeholder="Add a min salary here..."
                type="minSalary"
                name="minSalary"
                id="minSalary"
                label="Min Salary"
                styling="flex flex-col"
                required
                control={control}
                errors={errors.minSalary?.message}
                dirtyField={dirtyFields.minSalary}
                watchField={watch('minSalary')}
                submitted={isSubmitted}
              />
            </div>
            <div className="flex w-full flex-col">
              <FormInput
                register={register}
                placeholder="Add a max salary here..."
                type="maxSalary"
                name="maxSalary"
                id="maxSalary"
                label="Max Salary"
                required
                control={control}
                errors={errors.maxSalary?.message}
                dirtyField={dirtyFields.maxSalary}
                watchField={watch('maxSalary')}
                submitted={isSubmitted}
              />
            </div>
          </div>

          <FormSelectAsyncCreate
            control={control}
            options={tags.seniorityTags}
            inputValueField="seniorityTags"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Experience"
            watchField={watch('seniorityTags')}
            submitted={isSubmitted}
            isSearchable={true}
            isMulti={true}
          />
          <FormSelectAsyncCreate
            control={control}
            options={tags.employmentTypeTags}
            inputValueField="employmentTypeTags"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Employment Type"
            watchField={watch('employmentTypeTags')}
            submitted={isSubmitted}
            isSearchable={true}
            isMulti={true}
          />
          <FormSelectAsyncCreate
            control={control}
            options={tags.companySizeTags}
            inputValueField="companySizeTag"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Company Size"
            watchField={watch('companySizeTag')}
            submitted={isSubmitted}
            isSearchable={false}
            isMulti={false}
          />
          <FormSelectAsyncCreate
            control={control}
            options={tags.companyTypeTags}
            inputValueField="companyTypeTag"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Company Type"
            watchField={watch('companyTypeTag')}
            submitted={isSubmitted}
            isSearchable={false}
            isMulti={false}
          />
          <FormSelectAsyncCreate
            control={control}
            options={tags.workLocationTags}
            inputValueField="workLocationTag"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Work Location"
            watchField={watch('workLocationTag')}
            submitted={isSubmitted}
            isSearchable={false}
            isMulti={false}
          />
          <FormSelectAsyncCreate
            control={control}
            options={tags.companyDomainTags}
            inputValueField="companyDomainTag"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Company Main Domain"
            watchField={watch('companyDomainTag')}
            submitted={isSubmitted}
            isSearchable={false}
            isMulti={false}
          />
          <FormSelectAsyncCreate
            control={control}
            options={tags.techTags}
            inputValueField="techTags"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Technology Tags"
            watchField={watch('techTags')}
            submitted={isSubmitted}
            isSearchable={true}
            isMulti={true}
          />
          <FormSelectAsyncCreate
            control={control}
            options={tags.benefitsTags}
            inputValueField="benefitsTags"
            selectOptionField="id"
            selectOptionLabel="labelName"
            label="Benefits"
            watchField={watch('benefitsTags')}
            submitted={isSubmitted}
            isSearchable={true}
            isMulti={true}
          />

          <FormSelectAsyncCreate
            control={control}
            options={googlePlaces}
            inputValueField="location"
            selectOptionField="id"
            selectOptionLabel="label"
            label="Company Location"
            watchField={watch('location')}
            errors={errors.location?.label?.message}
            submitted={isSubmitted}
            isSearchable={true}
            onInputChange={onLocationInputChange}
            selectPlaceholder="Add a job location..."
          />

          {!isNewCompanyNeeded && !isUserAddingNewCompany && (
            <FormSelect
              // <FormSelectAsyncCreate
              control={control}
              options={profileCompanies}
              inputValueField="companyID"
              selectOptionField="id"
              selectOptionLabel="name"
              handleOptionsChange={handleCompanyChange}
              label="Company"
              watchField={watch('companyID')}
              errors={errors.companyID?.message}
              dirtyField={dirtyFields.companyID}
              submitted={isSubmitted}
              isSearchable={false}
            />
          )}

          <div className="block w-full">
            <Button
              style={`text-[var(--text-color-primary)] cursor-auto  ${!isNewCompanyNeeded && !isUserAddingNewCompany && 'hover:brightness-[80%] mb-4 ml-1 cursor-pointer'}  ${!isNewCompanyNeeded && '[&]:cursor-pointer'}`}
              action={toggleAddNewCompanyHandler}
            >
              {/* {isNewCompanyNeeded && isUserAddingNewCompany ? 'Select Existing Company' : 'Add New Company'} */}
              {textExistingCompany()}
            </Button>
          </div>
          {isUserAddingNewCompany && (
            <>
              <FormInput
                register={register}
                placeholder="Add a company name here..."
                type="text"
                name="newCompany.name"
                id="newCompany.name"
                label="Company Name"
                required
                control={control}
                errors={errors.newCompany?.name?.message}
                dirtyField={dirtyFields.newCompany?.name}
                watchField={watch('newCompany.name')}
                submitted={isSubmitted}
              />

              <FormTextarea
                register={register}
                placeholder="Add a company description here..."
                type="text"
                name="newCompany.description"
                id="newCompany.description"
                label="Company Description"
                styling=" [&]:p-0 max-h-[400px] min-h-[100px]"
                required
                errors={errors.newCompany?.description?.message}
                dirtyField={dirtyFields.newCompany?.description}
                watchField={watch('newCompany.description')}
                submitted={isSubmitted}
              />

              <FormInput
                register={register}
                placeholder="Add a company email here..."
                type="email"
                name="newCompany.email"
                id="newCompany.email"
                label="Company Email"
                required
                control={control}
                errors={errors.newCompany?.email?.message}
                dirtyField={dirtyFields.newCompany?.email}
                watchField={watch('newCompany.email')}
                submitted={isSubmitted}
              />

              <FormInput
                register={register}
                placeholder="Add a company logo image here..."
                type="text"
                name="newCompany.logoImage"
                id="newCompany.logoImage"
                label="Company Logo Image"
                required
                control={control}
                errors={errors.newCompany?.logoImage?.message}
                dirtyField={dirtyFields.newCompany?.logoImage}
                watchField={watch('newCompany.logoImage')}
                submitted={isSubmitted}
              />
              <UploadCompanyLogo
                companyLogoImagePath={companySelectedOption?.logoImage || '/images/logos/logo1.png'}
                newImageUpdateTime={Date.now()}
                changeImagePreview={changeImagePreviewHandler}
                imgMultipartPreview={imgMultipartPreview}
              />

              <FormInput
                register={register}
                placeholder="Add a company website URL here..."
                type="text"
                name="newCompany.websiteURL"
                id="newCompany.websiteURL"
                label="Company Website URL"
                required
                control={control}
                errors={errors.newCompany?.websiteURL?.message}
                dirtyField={dirtyFields.newCompany?.websiteURL}
                watchField={watch('newCompany.websiteURL')}
                submitted={isSubmitted}
              />
            </>
          )}

          <div className="flex items-center justify-center">
            <FormInput
              register={register}
              placeholder=""
              type="checkbox"
              name="isHighlighted"
              id="isHighlighted"
              label=""
              styling="[&]:w-6 [&]:p-0 !mb-0 h-6 ml-1  cursor-pointer accent-[var(--color-green-light)] "
              required
              control={control}
              errors={errors.isHighlighted?.message}
              dirtyField={dirtyFields.isHighlighted}
              watchField={watch('isHighlighted')}
              submitted={isSubmitted}
            ></FormInput>

            <label className="mx-4" htmlFor="color">
              Highlight the post
            </label>
            <FormInput
              register={register}
              placeholder="Add a color here..."
              type="color"
              name="color"
              id="color"
              label="Color: "
              styling="[&]:w-20 [&]:p-0 !mb-0 "
              required
              control={control}
              errors={errors.color?.message}
              // touchedField={touchedFields.email}
              dirtyField={dirtyFields.color}
              watchField={watch('color')}
              submitted={isSubmitted}
              setValue={setValue}
            ></FormInput>
          </div>

          <div className="block w-full">
            <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
              Add Job Post
            </Button>
          </div>
        </FormWrapper>
        <MessageResult
          isLoadingAction={isLoading || isButtonLoginDisabled}
          isError={isMessageError}
          message={resultMessageDisplay}
          maxWidth={'450px'}
        />
      </Card>
    </div>
  );
};

export default AddJobPost;
