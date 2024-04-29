import React, { useEffect, useState } from 'react';

type Props = {
  name: string;
  label: string;
  id: string;
  errors?: string;
  touchedField?: boolean;
  dirtyField?: boolean;
  watchField?: any;
  extraError?: string;
  submitted?: boolean;
  styling?: string;

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
  extraError,
  submitted,
  styling = '',
  ...inputProps
}: Props) => {
  const [isTyping, setIsTyping] = useState(false);
  const [watchFieldPrev, setWatchFieldPrev] = useState<string | undefined>('');

  const [errorsArray, setErrorsArray] = useState<string[]>([]);

  useEffect(() => {
    let errorsForm = [];
    if (extraError !== undefined && extraError !== '') {
      errorsForm = errors?.split(',') || [];
      errorsForm?.push(extraError);
    } else {
      errorsForm = errors?.split(',') || [];
    }
    setErrorsArray(errorsForm || []);
  }, [errors, extraError]);

  const errorMessages =
    (((!isTyping && dirtyField) || submitted) &&
      errorsArray.map((error: string, index) => {
        return (
          <li
            className="  font-normal text-[var(--color-red-light)] [&>li]:mb-4 [&>li]:marker:text-[color:red]"
            key={index}
          >
            &#x2022; {error}
          </li>
        );
      })) ||
    [];

  useEffect(() => {
    if (watchField === undefined) return;

    if (watchFieldPrev !== watchField) {
      setIsTyping(true);
      setWatchFieldPrev(watchField);
    }

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [watchField, watchFieldPrev]);

  const isFocusedAndValid =
    dirtyField &&
    errorsArray.length === 0 &&
    !isTyping &&
    'border-2 border-[var(--color-green-light)] focus:border-[var(--color-green-light)] focus:shadow-[0_0_10px_var(--color-green-light)] focus:ring-1 focus:ring-[var(--color-green-light)]';
  const isInputInvalidClass =
    errorsArray.length > 0 &&
    (dirtyField || submitted) &&
    !isTyping &&
    'border-2 border-[var(--color-red-light)] bg-[var(--color-red-light-2)]';
  const isInputProcessingClass =
    (dirtyField === false || errorsArray.length === 0) && 'border-2 border-[var(--color-blue-light)]';

  return (
    <>
      <label className="" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name)}
        id={id}
        name={name}
        className={`w-full border-2 border-[var(--color-blue-light)] ${isInputProcessingClass} ${isInputInvalidClass} ${isFocusedAndValid} ${errorMessages.length === 0 ? 'mb-4' : 'mb-0'} !mb-0   h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-md rounded-sm  border-2 border-blue-500 bg-white p-0 text-[var(--color-grey-dark-5)] checked:border-0 checked:bg-blue-800 focus:outline-none
        ${styling}`}
        {...inputProps}
      />
      <label htmlFor="some_id">This is the checkbox label</label>
      <svg
        className="
      absolute 
      mt-1 hidden h-4
      w-4 peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      {!isTyping && errorMessages.length > 0 && <ul className="mt-2 w-full">{errorMessages}</ul>}
    </>
  );
};

export default React.memo(FormInput);
