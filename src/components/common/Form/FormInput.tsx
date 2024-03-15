import React, { useEffect, useState } from 'react';

type Props = {
  name: string;
  label: string;
  id: string;
  errors?: string;
  touchedField?: boolean;
  dirtyField?: boolean;
  watchField?: string;

  [extra: string]: any;
};

const FormInput = ({
  name,
  register,
  label,
  id,
  errors,
  dirtyField,
  watchField,
  touchedField,
  ...inputProps
}: Props) => {
  const [fieldChanged, setFieldChanged] = useState(false);
  const [watchFieldPrev, setWatchFieldPrev] = useState('');

  const errorMessages =
    ((fieldChanged || touchedField) &&
      errors?.split(',').map((error: string, index) => {
        return (
          <li
            className="  font-normal text-[var(--color-red-light)] [&>li]:mb-4 [&>li]:marker:text-[color:red]"
            key={index}
          >
            {error}
          </li>
        );
      })) ||
    [];
  // box-shadow: 0 0 10px var(--color-blue-light);
  // <div class="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"></div>
  // ${dirtyField && errors == null && 'border-2 border-[var(--color-green-light)] focus:border-[var(--color-green-light)] focus:shadow-[0_0_10px_var(--color-green-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-green-light)]'}`}

  useEffect(() => {
    // implement a debounce

    const timeout = setTimeout(() => {
      if (watchField !== '' && watchField !== undefined && watchField !== null && watchField !== watchFieldPrev) {
        setFieldChanged(true);
        setWatchFieldPrev(watchField);
      } else {
        setFieldChanged(false);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [watchField]);

  console.log('watchField', watchField);
  console.log('fieldChanged', fieldChanged);
  console.log('dirtyField', dirtyField);
  console.log('errors', errors);
  return (
    <>
      <label className="w-full" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name)}
        id={id}
        name={name}
        className={`w-full ${!touchedField && errors == null && 'border-2 border-[var(--color-blue-light)]'} ${errors != null && (fieldChanged || touchedField) && 'border-2 border-[var(--color-red-light)] bg-[var(--color-red-light-2)]'} mb-4 rounded-md  p-3 text-[var(--color-grey-dark-5)] ${dirtyField && errors == null && 'border-2 border-[var(--color-green-light)] focus:border-[var(--color-green-light)] focus:shadow-[0_0_10px_var(--color-green-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-green-light)]'} `}
        {...inputProps}
      />
      <ul className="w-full">{errorMessages}</ul>
    </>
  );
};

export default FormInput;
