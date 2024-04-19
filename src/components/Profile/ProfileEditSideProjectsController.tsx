import React, { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppSelector } from '@/store/hooks';
import { SideProjectEntryModel } from '@/models/Profiles/SideProjectEntryModel';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import FormTextarea from '../common/Form/FormTextarea';

type Props = {
  fields: SideProjectEntryModel[];
  append: (_education: SideProjectEntryModel) => void;
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

function ProfileEditSideProjectsController({
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
  // const { control, register, handleSubmit } = useForm();
  const { loggedInUser } = useAppSelector((state) => state.userData);

  useEffect(() => {
    if (loggedInUser.sideProjects) {
      remove();
      loggedInUser.sideProjects.forEach((sideProject) => {
        append({
          indexOrder: sideProject.indexOrder,
          title: sideProject.title,
          description: sideProject.description,
          startYear: sideProject.startYear,
          endYear: sideProject.endYear,
          url: sideProject.url,
        });
      });
    }
  }, [loggedInUser.sideProjects, append, remove]);

  const handleAddField = () => {
    // e.preventDefault();
    append({
      indexOrder: fields.length + 1,
      title: '',
      description: '',
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
        <div className="relative flex w-full flex-row flex-wrap" key={field.indexOrder}>
          <h4 className="w-full text-lg text-[var(--color-accent-blog)]">
            &#x2022; Side Project {field?.indexOrder ?? 0 + 1}
          </h4>
          <div className="mr-[10px] flex min-w-[90px] flex-grow  flex-col">
            <FormInput
              register={register}
              placeholder="2015"
              type="text"
              name={`sideProjects.${index}.startYear`}
              id={`sideProjects.${index}.startYear`}
              label="Start Year"
              control={control}
              errors={errors.sideProjects?.[index]?.startYear?.message}
              dirtyField={dirtyFields.sideProjects?.[index]?.startYear}
              touchedField={touchedFields.sideProjects?.[index]?.startYear}
              watchField={watch(`sideProjects.${index}.startYear`)}
              submitted={isSubmitted}
              required
              styling="flex flex-col  "
            />
          </div>
          <div className="mr-[10px] flex min-w-[80px]  flex-grow  flex-col">
            <FormInput
              register={register}
              placeholder="2020"
              type="text"
              name={`sideProjects.${index}.endYear`}
              id={`sideProjects.${index}.endYear`}
              label="End Year"
              control={control}
              errors={errors.sideProjects?.[index]?.endYear?.message}
              dirtyField={dirtyFields.sideProjects?.[index]?.endYear}
              touchedField={touchedFields.sideProjects?.[index]?.endYear}
              watchField={watch(`sideProjects.${index}.endYear`)}
              submitted={isSubmitted}
              required
              styling="flex flex-col  "
            />
          </div>
          <div className="mr-[10px] flex min-w-[200px] flex-grow  flex-col">
            <FormInput
              register={register}
              placeholder="Project Name"
              type="text"
              name={`sideProjects.${index}.title`}
              id={`sideProjects.${index}.title`}
              label="Name"
              control={control}
              errors={errors.sideProjects?.[index]?.title?.message}
              // dirtyField={false}
              touchedField={touchedFields.sideProjects?.[index]?.title}
              dirtyField={dirtyFields.sideProjects?.[index]?.title}
              watchField={watch(`sideProjects.${index}.title`)}
              submitted={isSubmitted}
              required
              styling="flex flex-col  flex-grow"
            />
          </div>
          <div className="mr-[10px] flex min-w-[200px] flex-grow flex-col">
            <FormInput
              register={register}
              placeholder="https://www.example.com"
              type="text"
              name={`sideProjects.${index}.url`}
              id={`sideProjects.${index}.url`}
              label="URL"
              control={control}
              errors={errors.sideProjects?.[index]?.url?.message}
              dirtyField={dirtyFields.sideProjects?.[index]?.url}
              touchedField={touchedFields.sideProjects?.[index]?.url}
              watchField={watch(`sideProjects.${index}.url`)}
              submitted={isSubmitted}
              styling="flex flex-col  flex-grow"
              required
            />
          </div>
          <div className="mr-[10px] flex w-full min-w-[200px] flex-grow flex-col">
            <FormTextarea
              register={register}
              placeholder="More details about the project..."
              type="text"
              name={`sideProjects.${index}.description`}
              id={`sideProjects.${index}.description`}
              label="Description"
              control={control}
              errors={errors.sideProjects?.[index]?.description?.message}
              dirtyField={dirtyFields.sideProjects?.[index]?.description}
              touchedField={touchedFields.sideProjects?.[index]?.description}
              watchField={watch(`sideProjects.${index}.description`)}
              submitted={isSubmitted}
              styling="[&]:h-40 [&]:p-2 max-h-[400px] min-h-[100px] flex-grow"
              required
            />
          </div>

          <input
            key={index + 1} // important to include key with field's id
            {...register(`sideProjects.${index}.indexOrder`)}
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
            Add Side Project
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

export default ProfileEditSideProjectsController;
