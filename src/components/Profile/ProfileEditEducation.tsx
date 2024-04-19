import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppSelector } from '@/store/hooks';
import useDisplayResultMessage from '@/hooks/useDisplayResultMessage';
import { useUpdateMyProfileMutation } from '@/api/authenticationApi';
import { toastifyError, toastifySuccess } from '@/utils/helpers';
import * as Sentry from '@sentry/nextjs';
import { EditMyProfile } from '@/models/Profiles/EditProfileModel';
import { EditMyProfileEducationsValidationModel } from '@/validations/profiles/EditProfileEducationModel';
import EditMyProfileEducationValidationBody from '@/validations/profiles/EditProfileEducationBody';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import MessageResult from '../common/MessageResult/MessageResult';
import FormWrapper from '../common/Form/FormWrapper';

function ProfileEditEducation() {
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
    resolver: yupResolver(EditMyProfileEducationValidationBody, { abortEarly: false, recursive: true }),
  });
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
  //   control, // control props comes from useForm (optional: if you are using FormProvider)
  //   name: 'test', // unique name for your Field Array
  // });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
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

  const onSubmitHandler = (data: EditMyProfileEducationsValidationModel) => {
    console.log(data);
    updateUserProfileData(data);
  };

  useEffect(() => {
    if (loggedInUser.educations) {
      remove();
      loggedInUser.educations.forEach((education) => {
        append({
          indexOrder: education.indexOrder,
          title: education.title,
          institution: education.institution,
          startYear: education.startYear,
          endYear: education.endYear,
          url: education.url,
        });
      });
    }
  }, [loggedInUser.educations, append, remove]);

  const handleAddField = () => {
    // e.preventDefault();
    append({
      indexOrder: fields.length + 1,
      title: '',
      institution: '',
      startYear: '',
      endYear: '',
      url: '',
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)} addStyles="max-w-[800px] ">
        {fields.map((field, index) => (
          <div className="relative flex w-full flex-row flex-wrap sm:flex-nowrap" key={field.id}>
            <div className="mr-[10px] flex min-w-[90px]  flex-col">
              <FormInput
                register={register}
                placeholder="2015"
                type="text"
                name={`educations.${index}.startYear`}
                id={`educations.${index}.startYear`}
                label="Start Year"
                control={control}
                errors={errors.educations?.[index]?.startYear?.message}
                dirtyField={dirtyFields.educations?.[index]?.startYear}
                touchedField={touchedFields.educations?.[index]?.startYear}
                watchField={watch(`educations.${index}.startYear`)}
                submitted={isSubmitted}
                required
                styling="flex flex-col  "
              />
            </div>
            <div className="mr-[10px] flex min-w-[80px] flex-col">
              <FormInput
                register={register}
                placeholder="2020"
                type="text"
                name={`educations.${index}.endYear`}
                id={`educations.${index}.endYear`}
                label="End Year"
                control={control}
                errors={errors.educations?.[index]?.endYear?.message}
                dirtyField={dirtyFields.educations?.[index]?.endYear}
                touchedField={touchedFields.educations?.[index]?.endYear}
                watchField={watch(`educations.${index}.endYear`)}
                submitted={isSubmitted}
                required
                styling="flex flex-col  "
              />
            </div>
            <div className="mr-[10px] flex min-w-[200px] flex-grow  flex-col">
              <FormInput
                register={register}
                placeholder="Computer Science"
                type="text"
                name={`educations.${index}.title`}
                id={`educations.${index}.title`}
                label="Specialization"
                control={control}
                errors={errors.educations?.[index]?.title?.message}
                // dirtyField={false}
                touchedField={touchedFields.educations?.[index]?.title}
                dirtyField={dirtyFields.educations?.[index]?.title}
                watchField={watch(`educations.${index}.title`)}
                submitted={isSubmitted}
                required
                styling="flex flex-col  flex-grow"
              />
            </div>
            <div className="mr-[10px] flex min-w-[200px] flex-grow flex-col">
              <FormInput
                register={register}
                placeholder="University of California"
                type="text"
                name={`educations.${index}.institution`}
                id={`educations.${index}.institution`}
                label="Institution"
                control={control}
                errors={errors.educations?.[index]?.institution?.message}
                dirtyField={dirtyFields.educations?.[index]?.institution}
                touchedField={touchedFields.educations?.[index]?.institution}
                watchField={watch(`educations.${index}.institution`)}
                submitted={isSubmitted}
                styling="flex flex-col  flex-grow"
                required
              />
            </div>
            <input
              key={index + 1} // important to include key with field's id
              {...register(`educations.${index}.indexOrder`)}
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
              Add Education
            </Button>
          </div>
          <div className=" ">
            <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
              Save Changes
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

export default ProfileEditEducation;
