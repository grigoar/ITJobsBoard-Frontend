import { EmploymentEntryModel } from '@/models/Profiles/EmploymentEntryModel';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from '../common/Button/Button';
import FormInput from '../common/Form/FormInput';
import FormTextarea from '../common/Form/FormTextarea';

type Props = {
  fields: EmploymentEntryModel[];
  append: (_education: EmploymentEntryModel) => void;
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

function ProfileEditEmploymentController({
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
      {fields.map((field, index) => (
        <div className="relative flex w-full flex-row flex-wrap " key={field.indexOrder}>
          <h4 className="w-full text-lg text-[var(--color-accent-blog)]">
            &#x2022; Experience {field?.indexOrder ?? 0 + 1}
          </h4>
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
      <div className="flex">
        <div className=" mr-4">
          <Button style={`btn btn-ghost `} type="button" action={handleAddField}>
            Add Experience
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

export default ProfileEditEmploymentController;
