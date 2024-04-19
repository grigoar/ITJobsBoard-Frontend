import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditMyProfileEmploymentsValidationBody from '@/validations/profiles/EditProfileEmploymentsBody';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppSelector } from '@/store/hooks';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useUpdateMyProfileMutation } from '@/api/authenticationApi';
import { toastifyError, toastifySuccess } from '@/utils/helpers';
import * as Sentry from '@sentry/nextjs';
import { EditMyProfile } from '@/models/Profiles/EditProfileModel';
import { EditMyProfileEmploymentsValidationModel } from '@/validations/profiles/EditProfileEmploymentsModel';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import MessageResult from '../common/MessageResult/MessageResult';
import FormWrapper from '../common/Form/FormWrapper';
import FormTextarea from '../common/Form/FormTextarea';

function ProfileEditEmployment() {
  // const { control, register, handleSubmit } = useForm();
  const { loggedInUser } = useAppSelector((state) => state.userData);
  const { showResultErrorMessage, showResultSuccessMessage, isMessageError, resultMessageDisplay } =
    useDisplayResultMessage(10);
  const [updateMyProfile, { isLoading: isLoadingUpdateData }] = useUpdateMyProfileMutation();
  const {
    control,
    // errors,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitted, touchedFields },
    watch,
    register,
  } = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(EditMyProfileEmploymentsValidationBody, { abortEarly: false, recursive: true }),
  });
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
  //   control, // control props comes from useForm (optional: if you are using FormProvider)
  //   name: 'test', // unique name for your Field Array
  // });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employments',
    keyName: 'id',
  });

  const updateUserProfileData = async (userProfileData: EditMyProfile) => {
    try {
      await updateMyProfile(userProfileData).unwrap();
      showResultSuccessMessage('Experience updated successfully!');
      toastifySuccess('Experience updated successfully!');
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

  const onSubmitHandler = (data: EditMyProfileEmploymentsValidationModel) => {
    console.log(data);
    updateUserProfileData(data);
  };

  useEffect(() => {
    if (loggedInUser.employments) {
      remove();
      loggedInUser.employments.forEach((employment) => {
        append({
          indexOrder: employment.indexOrder,
          title: employment.title,
          company: employment.company,
          startYear: employment.startYear,
          endYear: employment.endYear,
          url: employment.url,
          description: employment.description,
        });
      });
    }
  }, [loggedInUser.employments, append, remove]);

  const handleAddField = () => {
    // e.preventDefault();
    append({
      indexOrder: fields.length + 1,
      title: '',
      company: '',
      startYear: '',
      endYear: '',
      url: '',
      description: '',
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)} addStyles="max-w-[800px] ">
        {fields.map((field, index) => (
          <div className="relative flex w-full flex-row flex-wrap " key={field.id}>
            <div className="mr-[10px] flex min-w-[90px] flex-grow flex-col">
              <FormInput
                register={register}
                placeholder="2015"
                type="text"
                name={`employments.${index}.startYear`}
                id={`employments.${index}.startYear`}
                label="Start Year"
                control={control}
                errors={errors.employments?.[index]?.startYear?.message}
                dirtyField={dirtyFields.employments?.[index]?.startYear}
                touchedField={touchedFields.employments?.[index]?.startYear}
                watchField={watch(`employments.${index}.startYear`)}
                submitted={isSubmitted}
                required
                styling="flex flex-col  "
              />
            </div>
            <div className="mr-[10px] flex min-w-[80px] flex-grow flex-col">
              <FormInput
                register={register}
                placeholder="2020"
                type="text"
                name={`employments.${index}.endYear`}
                id={`employments.${index}.endYear`}
                label="End Year"
                control={control}
                errors={errors.employments?.[index]?.endYear?.message}
                dirtyField={dirtyFields.employments?.[index]?.endYear}
                touchedField={touchedFields.employments?.[index]?.endYear}
                watchField={watch(`employments.${index}.endYear`)}
                submitted={isSubmitted}
                required
                styling="flex flex-col  "
              />
            </div>
            <div className="mr-[10px] flex min-w-[200px] flex-grow  flex-col">
              <FormInput
                register={register}
                placeholder="Frontend Developer"
                type="text"
                name={`employments.${index}.title`}
                id={`employments.${index}.title`}
                label="Role"
                control={control}
                errors={errors.employments?.[index]?.title?.message}
                // dirtyField={false}
                touchedField={touchedFields.employments?.[index]?.title}
                dirtyField={dirtyFields.employments?.[index]?.title}
                watchField={watch(`employments.${index}.title`)}
                submitted={isSubmitted}
                required
                styling="flex flex-col  flex-grow"
              />
            </div>
            <div className="mr-[10px] flex min-w-[200px] flex-grow flex-col">
              <FormInput
                register={register}
                placeholder="Google"
                type="text"
                name={`employments.${index}.company`}
                id={`employments.${index}.company`}
                label="Company"
                control={control}
                errors={errors.employments?.[index]?.company?.message}
                dirtyField={dirtyFields.employments?.[index]?.company}
                touchedField={touchedFields.employments?.[index]?.company}
                watchField={watch(`employments.${index}.company`)}
                submitted={isSubmitted}
                styling="flex flex-col  flex-grow"
                required
              />
            </div>
            <div className="mr-[10px] flex w-full min-w-[200px] flex-grow flex-col">
              {/* Description */}
              <FormTextarea
                register={register}
                placeholder="Add a description of your role and responsibilities..."
                type="text"
                name={`employments.${index}.description`}
                id={`employments.${index}.description`}
                label="Role Description"
                control={control}
                errors={errors.employments?.[index]?.description?.message}
                dirtyField={dirtyFields.employments?.[index]?.description}
                touchedField={touchedFields.employments?.[index]?.description}
                watchField={watch(`employments.${index}.description`)}
                submitted={isSubmitted}
                styling="[&]:h-40 [&]:p-2 max-h-[400px] min-h-[100px] flex-grow"
                required
              />
            </div>
            <input
              key={index + 1} // important to include key with field's id
              {...register(`employments.${index}.indexOrder`)}
              value={index + 1}
              type="hidden"
            />

            <div className="block w-fit">
              <Button
                style={`simpleBtnLikeLink ${'classes.mobileNavBtn absolute top-0 right-[-10px] text-xl text-[var(--color-red-light)] cursor-pointer'}`}
                type="button"
                action={() => handleRemoveField(index)}
              >
                <AiOutlineCloseCircle className={''} />
              </Button>
            </div>
          </div>
        ))}
        {/* <button onClick={handleAddField}>Add field</button>
      <input type="submit" /> */}
        <div className="flex">
          <div className=" mr-4">
            <Button style={`btn btn-ghost `} type="button" action={handleAddField}>
              Add Experience
            </Button>
          </div>
          <div className=" ">
            <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
              Save Experience
            </Button>
          </div>
        </div>
      </FormWrapper>
      <div className="mt-4">
        <MessageResult isLoadingAction={isLoadingUpdateData} isError={isMessageError} message={resultMessageDisplay} />
      </div>
    </div>
  );
}

export default ProfileEditEmployment;
