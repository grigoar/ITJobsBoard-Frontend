import { GenericSelectOption } from '@/models/Common/GenericSelectOption';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

type FormSelectProps = {
  label: string;
  control: any;
  options: GenericSelectOption[];
  inputValueField: string;
  selectOptionField: string;
  selectOptionLabel: string;
  errors?: string;
  touchedField?: boolean | boolean[];
  dirtyField?: boolean | boolean[];
  watchField?: any;
  extraError?: string;
  submitted?: boolean;
  styling?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  onInputChange?: any;
  selectPlaceholder?: string;
};

const FormSelectAsyncCreate = ({
  selectOptionField,
  selectOptionLabel,
  inputValueField,
  control,
  options,
  label,
  watchField,
  errors,
  dirtyField,
  extraError,
  submitted,
  styling,
  isSearchable = true,
  isMulti = false,
  onInputChange,
  selectPlaceholder,
}: FormSelectProps) => {
  const [isTyping, setIsTyping] = useState(false);

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

    setIsTyping(true);

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [watchField]);

  // console.log()
  const isFocusedAndValid =
    errorsArray.length === 0 &&
    !isTyping &&
    'border-2 border-[var(--color-green-light)] focus:border-[var(--color-green-light)] focus:shadow-[0_0_10px_var(--color-green-light)] focus:ring-1 focus:ring-[var(--color-green-light)]';
  const isInputInvalidClass =
    // errors != null &&
    errorsArray.length > 0 &&
    (dirtyField || submitted) &&
    !isTyping &&
    'border-2 border-[var(--color-red-light)] bg-[var(--color-red-light-2)]';
  const isInputProcessingClass =
    (dirtyField === false || errorsArray.length === 0) && 'border-2 border-[var(--color-blue-light)]';

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      padding: '3px 0px',
      boxShadow: 'none',
      color: 'red',
      '&:focus': {
        border: '8px solid var(--color-red-light) !important',
      },
      margin: '0px',
      '&:focus-within': {
        boxShadow: '0 0 10px var(--color-green-light)',
        border: '1px solid var(--color-green-light)',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      // backgroundColor: 'var(--color-blue-light)',

      // color: 'white',
      marginRight: '5px',
      borderRadius: '5px',
      boxShadow: '0 0 4px var(--color-blue-light)',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      // color: 'white',
    }),
  };

  const optionsArrayWithLabelAndValue = options.map((option: any) => {
    return {
      // ...option,
      label: option[selectOptionLabel],
      value: option[selectOptionField],
    };
  });

  return (
    <div className="cursor-pointe4 ![&>input:focus-visible]:outline-none  w-full [&>div:focus]:border-4">
      <label className="block  ">{label}</label>
      <Controller
        name={inputValueField}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            options={optionsArrayWithLabelAndValue}
            className={`w-full cursor-pointer border-2 border-[var(--color-blue-light)]  ${isInputProcessingClass} ${isInputInvalidClass} ${isFocusedAndValid} ${errorMessages.length === 0 ? 'mb-4' : 'mb-0'} ![&>input:focus-visible]:outline-none rounded-md text-[var(--color-grey-dark-5)] focus:outline-none ${styling}    [&_input:focus-within]:!shadow-none [&_input]:!min-w-[60px]`}
            isSearchable={isSearchable}
            isMulti={isMulti}
            closeMenuOnSelect={!isMulti}
            styles={selectStyles}
            onInputChange={(inputValueSelect) => {
              onInputChange?.(inputValueSelect);
            }}
            placeholder={selectPlaceholder}
          />
        )}
        rules={{ required: true }}
      />
      {!isTyping && errorMessages.length > 0 && <ul className="mt-2 w-full">{errorMessages}</ul>}
    </div>
  );
};

export default FormSelectAsyncCreate;
