'use client';

import React, { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useRouter, useSearchParams } from 'next/navigation';
import { toastifySuccess } from '@/utils/helpers';
import AddJobPostSchema from '@/validations/jobPosts/AddJobPostSchema';
import AddJobPostModel from '@/models/JobPosts/AddJobPostModel';
import { useAddNewJobPostMutation } from '@/api/jobPostsApi';
import { typeGuardGeneralError } from '@/models/Errors/typeguards';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';
import MessageResult from '../common/MessageResult/MessageResult';

// TODO: check the refresh page and the theme
// TODO: Add a switch input for form
// TODO: Add a textarea input for form
const AddJobPost = () => {
  // const dispatchAppStore = useAppDispatch();

  // const [loginUser, { isLoading }] = useLoginUserMutation();
  const [addNewJobPost, { isLoading }] = useAddNewJobPostMutation();
  // const [logoutUser] = useLogoutCurrentUserMutation();
  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(0);
  const [isButtonLoginDisabled, setIsButtonLoginDisabled] = useState(false);
  // const [federatedAccount, setFederatedAccount] = useState<FederatedAccountError | undefined>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitted },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(AddJobPostSchema, { abortEarly: false, recursive: true }),
    // mode: 'onTouched',
    mode: 'all',

    defaultValues: {
      color: '#0000ff',
    },
  });

  const sendNotificationSuccess = useCallback(() => {
    toastifySuccess('Logged in successfully!');
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

  return (
    <div className="flex flex-col">
      <Card>
        <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
          <h2>Lets post a new job!</h2>

          <FormInput
            register={register}
            placeholder="Add a job description here..."
            type="description"
            name="description"
            id="description"
            label="Description"
            required
            errors={errors.description?.message}
            // touchedField={touchedFields.email}
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
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.title}
            watchField={watch('title')}
            submitted={isSubmitted}
          />

          <FormInput
            register={register}
            placeholder="Add a salary here..."
            type="salary"
            name="salary"
            id="salary"
            label="Salary"
            required
            errors={errors.salary?.message}
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.salary}
            watchField={watch('salary')}
            submitted={isSubmitted}
          />

          <FormInput
            register={register}
            placeholder="Add a location here..."
            type="location"
            name="location"
            id="location"
            label="Location"
            required
            errors={errors.location?.message}
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.location}
            watchField={watch('location')}
            submitted={isSubmitted}
          />

          <FormInput
            register={register}
            placeholder="Add a company ID here..."
            type="companyID"
            name="companyID"
            id="companyID"
            label="Company ID"
            required
            errors={errors.companyID?.message}
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.companyID}
            watchField={watch('companyID')}
            submitted={isSubmitted}
          />

          {/* <FormInput
            register={register}
            placeholder="http://www.example.com"
            type="text"
            name="websiteURL"
            id="websiteURL"
            label="Website URL"
            required
            errors={errors.company.websiteURL?.message}
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.websiteURL}
            watchField={watch('websiteURL')}
            submitted={isSubmitted}
          /> */}

          <FormInput
            register={register}
            placeholder="Add a color here..."
            type="color"
            name="color"
            id="color"
            label="Color"
            styling="w-16 p-0 flex"
            required
            errors={errors.color?.message}
            // touchedField={touchedFields.email}
            dirtyField={dirtyFields.color}
            watchField={watch('color')}
            submitted={isSubmitted}
          />

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
