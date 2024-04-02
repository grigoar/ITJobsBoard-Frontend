import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

type FormSelectProps = {
  label: string;
  control: any;
  options: Object[];
  inputValueField: string;
  selectOptionField: string;
  selectOptionLabel: string;
  handleOptionsChange?: any;
  errors?: string;
  touchedField?: boolean | boolean[];
  dirtyField?: boolean | boolean[];
  watchField?: any;
  extraError?: string;
  submitted?: boolean;
  styling?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
};

const FormSelect = ({
  selectOptionField,
  selectOptionLabel,
  inputValueField,
  control,
  options,
  label,
  handleOptionsChange,
  watchField,
  errors,
  dirtyField,
  extraError,
  submitted,
  styling,
  isSearchable = true,
  isMulti = false,
}: FormSelectProps) => {
  const [isTyping, setIsTyping] = useState(false);
  // const [watchFieldPrev, setWatchFieldPrev] = useState<string | undefined>('');

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
    // ((isTyping || touchedField) &&
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

  // ${dirtyField && errors == null && 'border-2 border-[var(--color-green-light)] focus:border-[var(--color-green-light)] focus:shadow-[0_0_10px_var(--color-green-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-green-light)]'}`}

  // console.log('errorMessages', errorMessages);
  // console.log('errorsMessages.length', errorMessages.length);
  useEffect(() => {
    // implement a debounce to check if the user is typing

    if (watchField === undefined) return;

    // if (watchFieldPrev !== watchField) {
    setIsTyping(true);
    //   setWatchFieldPrev(watchField);
    // }

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [watchField]);

  // console.log()
  const isFocusedAndValid =
    // dirtyField &&
    // errors == null &&
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
  // const [isValid, setIsValid] = React.useState(false);

  // useEffect(() => {
  //   // implement a debounce to check if the user is typing

  //   if (watchField === undefined) return;

  //   // if (watchFieldPrev !== watchField) {
  //   //   setIsTyping(true);
  //   //   setWatchFieldPrev(watchField);
  //   // }

  //   // const timeout = setTimeout(() => {
  //   //   setIsTyping(false);
  //   // }, 2000);

  //   // return () => clearTimeout(timeout);
  //   if (watchField !== false && watchField !== '') {
  //     setIsValid(true);
  //   }
  // }, [watchField]);

  // console.log('isValid', isValid);
  // console.log('watchField', watchField);
  // const isFocusedAndValid =
  //   isValid &&
  //   'border-2 border-[var(--color-green-light)] focus:border-[var(--color-green-light)] focus:shadow-[0_0_10px_var(--color-green-light)] focus:ring-1 focus:ring-[var(--color-green-light)]';

  return (
    <div className="cursor-pointe4 mb-4 w-full [&>div:focus]:border-4 ">
      <label className="block  ">{label}</label>
      <Controller
        // name="companyID"
        name={inputValueField}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            // value={profileCompanies.find((company) => company.id === value)}
            value={options.find((option: any) => option[selectOptionField] === value)}
            ref={ref}
            onChange={(selectedOption: any) => {
              // onChange(selectedCompany?.id);
              if (isMulti) {
                onChange(selectedOption.map((option: any) => option[selectOptionField]));
              } else {
                onChange(selectedOption[selectOptionField]);
              }
              handleOptionsChange(selectedOption);
            }}
            options={options}
            className={`w-full cursor-pointer border-2 border-[var(--color-blue-light)]  ${isInputProcessingClass} ${isInputInvalidClass} ${isFocusedAndValid} ${errorMessages.length === 0 ? 'mb-4' : 'mb-0'} rounded-md text-[var(--color-grey-dark-5)] focus:outline-none [&_input:focus]:outline-none ${styling} `}
            // getOptionLabel={(option) => option.name}
            getOptionLabel={(option) => option[selectOptionLabel]}
            // getOptionValue={(option) => option.id}
            getOptionValue={(option) => option[selectOptionField]}
            // TODO: the text search outline styling is broken
            isSearchable={isSearchable}
            isMulti={isMulti}
            // isSearchable={false}
          />
        )}
        rules={{ required: true }}
      />
    </div>
  );
};

export default FormSelect;
