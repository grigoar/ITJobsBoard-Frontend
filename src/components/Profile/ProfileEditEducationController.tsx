import React, { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppSelector } from '@/store/hooks';
import { EducationEntryModel } from '@/models/Profiles/EducationEntryModel';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';

type Props = {
  fields: EducationEntryModel[];
  append: (_education: EducationEntryModel) => void;
  remove: (_index?: number) => void;
  register: any;
  control: any;
  errors: any;
  dirtyFields: any;
  touchedFields: any;
  watch: any;
  isSubmitted: boolean;
  onSubmitHandler: () => void;
};

function ProfileEditEducationController({
  fields,
  append,
  remove,
  register,
  control,
  errors,
  dirtyFields,
  touchedFields,
  watch,
  isSubmitted,
  onSubmitHandler,
}: Props) {
  const { loggedInUser } = useAppSelector((state) => state.userData);

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
      {fields.map((field, index) => (
        <>
          <h4 className="block w-full text-lg text-[var(--color-accent-blog)]">
            &#x2022; Education {field?.indexOrder ?? 0 + 1}
          </h4>
          <div className="relative flex w-full flex-row flex-wrap sm:flex-nowrap" key={field.indexOrder}>
            <div className="mr-[10px] flex min-w-[90px] flex-grow flex-col">
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
            <div className="mr-[10px] flex min-w-[80px] flex-grow flex-col">
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
        </>
      ))}
      <div className="flex">
        <div className=" mr-4">
          <Button style={`btn btn-ghost `} type="button" action={handleAddField}>
            Add Education
          </Button>
        </div>
        <div className=" ">
          <Button style={`btn btn-ghost `} type="submit" action={onSubmitHandler}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditEducationController;
