'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import { TagListName } from '@/models/tags/TagList.type';
import { TagEntity } from '@/models/tags/TagEntity';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';
import FormTextarea from '../common/Form/FormTextarea';
import FormSelect from '../common/Form/FormSelect';

// TODO: check the refresh page and the theme
// TODO: Maybe check the styling for select, but it should work fine for now
// TODO: Add skills to the job post
// TODO: Add a role to the user that can edit a company if it is the owner
// TODO: Create a profile for a company so it can be edited without the user logging in ( some email and token for the authorization)
const AddJobPost = () => {
  // const dispatchAppStore = useAppDispatch();

  // const [loginUser, { isLoading }] = useLoginUserMutation();
  const [addNewJobPost, { isLoading }] = useAddNewJobPostMutation();
  const { data: allTagsRes } = useGetAllTagsQuery(null);

  // const { data: userPracticeData } = useGetAllProfileCompaniesQuery(loggedInUser.id, { skip: loggedInUser.id === '' });
  const { loggedInUser } = useAppSelector((state) => state.userData);
  // TODO: Change the endpoint to get the companies for a logged in user
  const { data: userCompaniesRes } = useGetAllProfileCompaniesQuery(loggedInUser.id, { skip: loggedInUser.id === '' });
  // const [logoutUser] = useLogoutCurrentUserMutation();
  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);
  const [isButtonLoginDisabled, setIsButtonLoginDisabled] = useState(false);
  // const [toggleAddNewCompany, setToggleAddNewCompany] = useState(false);
  // const [companySelectedOption, setCompanySelectedOption] = useState<string | null>(null);
  const [companySelectedOption, setCompanySelectedOption] = useState<CompanyEntity | null>(null);
  // const [copmaniesOptions, setCompaniesOptions] = useState<string[]>([]);

  const [profileCompanies, setProfileCompanies] = useState<CompanyEntity[]>([]);
  const [techTags, setTechTags] = useState<TagEntity[]>([]);
  const [isNewCompanyNeeded, setIsNewCompanyNeeded] = useState(true);
  const [isUserAddingNewCompany, setIsUserAddingNewCompany] = useState(false);
  // const [isPostColored, setIsPostColored] = useState(true);
  // const [federatedAccount, setFederatedAccount] = useState<FederatedAccountError | undefined>();

  console.log('userCompanies', userCompaniesRes);
  console.log('allTagsRes', allTagsRes);
  const router = useRouter();
  const searchParams = useSearchParams();

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
    // mode: 'onTouched',
    mode: 'all',

    defaultValues: {
      color: '#0000ff',
      // minSalary: 0,
      // maxSalary: 0,
      // companyID: '0ae17a03-bc39-43bc-95cb-8f0af3527d4d',
    },
  });

  // const addPostColorHandler = () => {
  //   // setShowCredits((prev) => !prev);
  //   setIsPostColored((prev) => !prev);
  // };

  useEffect(() => {
    setProfileCompanies(userCompaniesRes?.items || []);
    setCompanySelectedOption(userCompaniesRes?.items[0] || null);
    setIsNewCompanyNeeded(userCompaniesRes?.items?.length === 0 || !userCompaniesRes?.items);
    setIsUserAddingNewCompany(userCompaniesRes?.items?.length === 0 || !userCompaniesRes?.items);
  }, [userCompaniesRes, setValue]);

  useEffect(() => {
    const techTagsOnly = allTagsRes?.items?.filter((tag: TagEntity) => tag.type === TagListName.TECH_SKILL) || [];
    setTechTags(techTagsOnly);
  }, [allTagsRes, setTechTags]);

  useEffect(() => {
    if (companySelectedOption) {
      setValue('companyID', companySelectedOption.id);
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

  const addNewJobPostHandler = async (jobPost: AddJobPostModel) => {
    try {
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

  const onSubmitHandler = (data: AddJobPostModel) => {
    console.log('data', data);
    addNewJobPostHandler(data);
    // loginUserHandler(data);
  };

  // const AddJobPostSchema = yup.object().shape({
  //   // profileID: yup.string().required(),
  //   description: yup.string().required('Description is required.'),
  //   title: yup.string().required(),
  //   salary: yup.number(),
  //   companyID: yup.string().required(),
  //   location: yup.string().required(),
  //   isHighlighted: yup.boolean(),
  //   color: yup.string(),
  //   isPremium: yup.boolean(),
  // });

  // export type AddCompanyModel = {
  //   name: string;
  //   description: string;
  //   email: string;
  //   logoImage: string;
  //   websiteURL: string;
  // };

  const toggleAddNewCompanyHandler = () => {
    if (isNewCompanyNeeded) {
      // setToggleAddNewCompany(true);

      setIsUserAddingNewCompany(true);
      return;
    }
    // setToggleAddNewCompany((prev) => !prev);
    setIsUserAddingNewCompany((prev) => !prev);
  };

  console.log("watch('defaultTags')", watch('defaultTags'));

  const handleCompanyChange = (selectedOption: CompanyEntity | null) => {
    console.log('selectedOption', selectedOption);
    setCompanySelectedOption(selectedOption);
    // setCompaniesOptions(userCompaniesRes?.companies.map((company) => company.name) || []);
  };

  const handleTagsChange = (selectedOption: TagEntity | null) => {
    console.log('selectedOptionTags', selectedOption);
    // setCompanySelectedOption(selectedOption);
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
            styling="[&]:h-40 [&]:p-0 max-h-[400px]"
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
                errors={errors.maxSalary?.message}
                dirtyField={dirtyFields.maxSalary}
                watchField={watch('maxSalary')}
                submitted={isSubmitted}
              />
            </div>
          </div>

          <FormInput
            register={register}
            placeholder="Add a location here..."
            type="location"
            name="location"
            id="location"
            label="Location"
            required
            errors={errors.location?.message}
            dirtyField={dirtyFields.location}
            watchField={watch('location')}
            submitted={isSubmitted}
          />

          <FormSelect
            control={control}
            options={techTags}
            inputValueField="defaultTags"
            selectOptionField="id"
            selectOptionLabel="name"
            handleOptionsChange={handleTagsChange}
            label="Default Tags"
            watchField={watch('defaultTags')}
            errors={errors.defaultTags?.message}
            dirtyField={dirtyFields.defaultTags}
            // touchedField={touchedFields.defaultTags}
            submitted={isSubmitted}
            isSearchable={true}
            isMulti={true}
          />

          {/* <FormInput
            register={register}
            placeholder="Add a company ID here..."
            type="companyID"
            name="companyID"
            id="companyID"
            label="Company ID"
            required
            errors={errors.companyID?.message}
            dirtyField={dirtyFields.companyID}
            watchField={watch('companyID')}
            submitted={isSubmitted}
          /> */}

          {!isNewCompanyNeeded && !isUserAddingNewCompany && (
            <FormSelect
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
          {/* <Controller
            name="companyID"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                value={profileCompanies.find((company) => company.id === value)}
                ref={ref}
                onChange={(selectedCompany) => {
                  onChange(selectedCompany?.id);
                  handleCompanyChange(selectedCompany);
                }}
                options={profileCompanies}
                className="w-full cursor-pointer rounded-md border-2 border-[var(--color-blue-light)]   text-[var(--color-grey-dark-5)]"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />
            )}
            rules={{ required: true }}
          /> */}
          {/* <Select
            value={companySelectedOption}
            onChange={handleCompanyChange}
            options={profileCompanies}
            className="w-full cursor-pointer rounded-md border-2 border-[var(--color-blue-light)]   text-[var(--color-grey-dark-5)]"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
          /> */}

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
                errors={errors.newCompany?.name?.message}
                // touchedField={touchedFields.email}
                dirtyField={dirtyFields.newCompany?.name}
                watchField={watch('newCompany.name')}
                submitted={isSubmitted}
              />

              <FormInput
                register={register}
                placeholder="Add a company description here..."
                type="text"
                name="newCompany.description"
                id="newCompany.description"
                label="Company Description"
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
                errors={errors.newCompany?.logoImage?.message}
                dirtyField={dirtyFields.newCompany?.logoImage}
                watchField={watch('newCompany.logoImage')}
                submitted={isSubmitted}
              />

              <FormInput
                register={register}
                placeholder="Add a company website URL here..."
                type="text"
                name="newCompany.websiteURL"
                id="newCompany.websiteURL"
                label="Company Website URL"
                required
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
              name="enabledColor"
              id="enabledColor"
              label=""
              styling="[&]:w-6 [&]:p-0 !mb-0 h-6 ml-1  cursor-pointer accent-[var(--color-green-light)] "
              required
              errors={errors.enabledColor?.message}
              dirtyField={dirtyFields.enabledColor}
              watchField={watch('enabledColor')}
              submitted={isSubmitted}
            ></FormInput>

            <label className="mx-4" htmlFor="color">
              Add a color to the post
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
              errors={errors.color?.message}
              // touchedField={touchedFields.email}
              dirtyField={dirtyFields.color}
              watchField={watch('color')}
              submitted={isSubmitted}
            ></FormInput>
          </div>

          {/* <input type="color" id="color" name="color" value="#0000ff" /> */}

          {/* <FormInput
            register={register}
            placeholder="Add a isHighlighted here..."
            type="isHighlighted"
            name="isHighlighted"
            id="isHighlighted"
            label="Is Highlighted"
            required
            errors={errors.isHighlighted?.message}
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.isHighlighted}
            watchField={watch('isHighlighted')}
            submitted={isSubmitted}
          /> */}

          {/* <FormInput
            register={register}
            placeholder="Add a isPremium here..."
            type="isPremium"
            name="isPremium"
            id="isPremium"
            label="Is Premium"
            required
            errors={errors.isPremium?.message}
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.isPremium}
            watchField={watch('isPremium')}
            submitted={isSubmitted}
          /> */}

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
        {/* <Button style={`btn btn-ghost `} type="submit" action={googleAuthHandler}>
        Sign in with Google
      </Button> */}
      </Card>
    </div>
  );
};

export default AddJobPost;
