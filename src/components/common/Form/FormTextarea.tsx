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

const FormTextarea = ({
  name,
  register,
  label,
  id,
  errors,
  dirtyField,
  watchField,
  extraError,
  submitted,
  styling,
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
      <label className="w-full" htmlFor={id}>
        {label}
      </label>
      <textarea
        {...register(name)}
        id={id}
        name={name}
        className={`w-full border-2 border-[var(--color-blue-light)] ${isInputProcessingClass} ${isInputInvalidClass} ${isFocusedAndValid} ${errorMessages.length === 0 ? 'mb-4' : 'mb-0'} rounded-md p-3  text-[var(--color-grey-dark-5)] focus:outline-none focus-visible:shadow-[0_0_10px_var(--color-green-light)] ${styling}`}
        {...inputProps}
      />
      {!isTyping && errorMessages.length > 0 && <ul className="mt-2 w-full">{errorMessages}</ul>}
    </>
  );
};

export default React.memo(FormTextarea);
