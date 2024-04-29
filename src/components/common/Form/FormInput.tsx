import constants from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

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
  setValue?: any;
  control: any;
  required?: boolean;
  hasInputIcon?: boolean;
  type: string;
  inputIconActive?: React.ReactNode;
  inputIconInactive?: React.ReactNode;
  register: any;
  placeholder?: string;
  defaultValue?: any[]; // this can be an options array
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
  extraError,
  submitted,
  styling,
  setValue,
  control,
  required,
  type,
  inputIconActive,
  inputIconInactive,
  hasInputIcon,
  ...inputProps
}: Props) => {
  const [isTyping, setIsTyping] = useState(false);
  const [watchFieldPrev, setWatchFieldPrev] = useState<string | undefined>('');
  const [colorValue, setColorValue] = useState<string>(constants.DEFAULT_COLOR_POST);
  const [colorTimeout, setColorTimeout] = useState<any>(0);
  const [showSensitive, setShowSensitive] = useState<boolean>(false);

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

  useEffect(() => {
    if (type === 'color') {
      setValue(name, colorValue);
    }
  }, [colorValue, type, name, setValue]);

  const errorMessages =
    (((!isTyping && dirtyField && touchedField) || submitted) &&
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

  const activeInactiveIconHandler = () => {
    setShowSensitive((prev) => !prev);
  };
  const inputIcon = hasInputIcon && showSensitive ? inputIconActive : inputIconInactive || null;

  return (
    <>
      <label className="" htmlFor={id}>
        {label}
        {required && <span className="text-[var(--color-red-light)]">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative w-full">
            <input
              {...register(name)}
              id={id}
              name={name}
              type={showSensitive && inputIcon ? 'text' : type}
              className={`w-full border-2 border-[var(--color-blue-light)] ${isInputProcessingClass} ${isInputInvalidClass} ${isFocusedAndValid} ${errorMessages.length === 0 ? 'mb-4' : 'mb-0'} rounded-md p-[10px]  text-[var(--color-grey-dark-5)] focus:outline-none focus-visible:shadow-[0_0_10px_var(--color-green-light)] ${styling}`}
              {...inputProps}
              onChange={(e) => {
                if (type === 'color') {
                  e.preventDefault();
                  clearTimeout(colorTimeout);
                  // ? set the color with a delay
                  setColorTimeout(
                    setTimeout(() => {
                      setColorValue(e.target.value);
                    }, 300)
                  );
                } else return field.onChange(e);
              }}
            />
            {inputIcon && (
              <div
                className={`absolute right-3 top-[50%] ${errorMessages.length === 0 ? 'translate-y-[-100%]' : 'translate-y-[-50%]'} transform text-xl`}
                onClick={activeInactiveIconHandler}
              >
                {inputIcon}
              </div>
            )}
          </div>
        )}
      />
      {!isTyping && errorMessages.length > 0 && <ul className="mt-2 w-full">{errorMessages}</ul>}
    </>
  );
};

export default React.memo(FormInput);
