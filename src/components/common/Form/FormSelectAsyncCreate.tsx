import { GenericSelectOption } from '@/models/Common/GenericSelectOption';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
// import Select from 'react-select';
// import AsyncCreatableSelect from 'react-select/async-creatable';
// import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

// type LocationPlaces = {
//   label: string;
//   value: string;
// };

type FormSelectProps = {
  label: string;
  control: any;
  // options: LocationPlaces[];
  options: GenericSelectOption[];
  inputValueField: string;
  selectOptionField: string;
  selectOptionLabel: string;
  handleOptionsChange?: any;
  createNewOptionObject: (_inputValue: string) => GenericSelectOption;
  errors?: string;
  touchedField?: boolean | boolean[];
  dirtyField?: boolean | boolean[];
  watchField?: any;
  extraError?: string;
  submitted?: boolean;
  styling?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  setValueHookForm: any;
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
  // handleOptionsChange,
  watchField,
  // setValueHookForm,
  errors,
  dirtyField,
  extraError,
  submitted,
  styling,
  isSearchable = true,
  isMulti = false,
  onInputChange,
  selectPlaceholder,
  // createNewOptionObject: createNewOption,
}: FormSelectProps) => {
  // const [inputValue, setInputValue] = React.useState('');
  // const [value, setValue] = React.useState<readonly GenericSelectOption[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  // const [optionsExtended, setOptionsExtended] = useState<GenericSelectOption[]>([]);
  // const [userCustomOptions, setUserCustomOptions] = useState<GenericSelectOption[]>([]);
  // const [googlePlaces, setGooglePlaces] = useState<LocationPlaces[]>([]);
  // const [watchFieldPrev, setWatchFieldPrev] = useState<string | undefined>('');
  // const { placePredictions, getPlacePredictions } = usePlacesService({
  //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   debounce: 500,
  //   options: {
  //     // types: ['(cities)', '(regions)', '(country)'],
  //     types: ['(regions)'],
  //   },
  // });

  // useEffect(() => {
  //   setOptionsExtended([...options, ...userCustomOptions]);
  // }, [options, userCustomOptions]);

  // useEffect(() => {
  //   console.log('placePredictions------------------------------------------------------------', placePredictions);

  //   if (placePredictions.length === 0) return;

  //   const placesStrings = placePredictions.map((place) => {
  //     return {
  //       label: place.description,
  //       value: place.description,
  //     };
  //   });

  //   console.log('placesStrings', placesStrings);
  //   console.log('userCustomPlaces', userCustomPlaces);
  //   setGooglePlaces(placesStrings);
  //   setOptionsExtended([...placesStrings, ...userCustomPlaces]);
  //   // setGooglePlaces(placesStrings);
  //   // setOptionsExtended(placesStrings);
  // }, [placePredictions]);

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

  // const onOptionCreateHandler = (option: GenericSelectOption) => {
  //   console.log('option to CREATE-------------------', option);
  //   setOptionsExtended([...options, ...userCustomOptions, option]);
  //   setUserCustomOptions([...userCustomOptions, option]);
  //   // THIS works for single select
  //   if (!isMulti) {
  //     setValueHookForm(inputValueField, option.name);
  //   }
  // };

  // console.log('googlePlaces+++++++++++++++++', googlePlaces);
  // console.log('optionsExtended+++++++++++++++++', optionsExtended);

  // const handleKeyDown: KeyboardEventHandler = (event: any) => {
  //   console.log('aaaaaa================', inputValue);
  //   if (!inputValue) return;
  //   console.log('================', inputValue);
  //   switch (event.key) {
  //     case 'Enter':
  //     case 'Tab': {
  //       // setValueHookForm(createNewOption(inputValue));
  //       const newOption = createNewOption(inputValue);
  //       console.log('newOption', newOption);
  //       setValue((prev) => {
  //         return [...prev, newOption];
  //       });
  //       // setValue((prev: any) => {
  //       //   // console.log('prev', prev);
  //       //   // return [...prev, createNewOption(inputValue)];
  //       //   return createNewOption(inputValue);
  //       // });

  //       setInputValue('');
  //       // event.preventDefault();
  //       break; // Add a break statement here
  //     }
  //     default:
  //   }
  // };

  const optionsArrayWithLabelAndValue = options.map((option: any) => {
    return {
      // ...option,
      label: option[selectOptionLabel],
      value: option[selectOptionField],
    };
  });

  // console.log('optionsArrayWithLabelAndValue', optionsArrayWithLabelAndValue);

  return (
    <div className="cursor-pointe4 ![&>input:focus-visible]:outline-none  w-full [&>div:focus]:border-4">
      <label className="block  ">{label}</label>
      <Controller
        // name="companyID"
        name={inputValueField}
        control={control}
        render={({ field }) => (
          // render={({ field: { onChange: onChanged, value, ref } }) => (
          // <AsyncCreatableSelect
          // <Select
          <CreatableSelect
            {...field}
            // value={profileCompanies.find((company) => company.id === value)}
            // value={options.find((option: any) => option[selectOptionField] === value)}
            // value={optionsExtended.find((option: any) => option[selectOptionField] === value)}
            // onChange={async (selectedOption: any) => {
            //   // onChange(selectedCompany?.id);
            //   if (isMulti) {
            //     field.onChange(selectedOption.map((option: any) => option[selectOptionField]));
            //   } else {
            //     field.onChange(selectedOption[selectOptionField]);
            //   }

            //   // * something in the future
            //   handleOptionsChange?.(selectedOption);
            // }}
            // options={googlePlaces}
            // options={optionsExtended}
            options={optionsArrayWithLabelAndValue}
            // options={options}
            className={`w-full cursor-pointer border-2 border-[var(--color-blue-light)]  ${isInputProcessingClass} ${isInputInvalidClass} ${isFocusedAndValid} ${errorMessages.length === 0 ? 'mb-4' : 'mb-0'} ![&>input:focus-visible]:outline-none rounded-md text-[var(--color-grey-dark-5)] focus:outline-none ${styling}    [&_input:focus-within]:!shadow-none [&_input]:!min-w-[60px]`}
            // getOptionLabel={(option) => option.name}
            // getOptionLabel={(option) => option.label}
            // getOptionLabel={(option) => option[selectOptionLabel]}
            // getOptionValue={(option) => option.id}
            // getOptionValue={(option) => option.value}
            // getOptionValue={(option) => option[selectOptionField]}
            // TODO: the text search outline styling is broken
            isSearchable={isSearchable}
            isMulti={isMulti}
            // isSearchable={false}
            closeMenuOnSelect={!isMulti}
            // controlShouldRenderValue={true}
            styles={selectStyles}
            // loadOptions={loadOptions}
            // cacheOptions={true}
            // defaultOptions={options}
            // defaultOptions={optionsExtended}
            // defaultOptions={googlePlaces}
            onMenuOpen={() => {
              console.log('menu opened');
              // getPlacePredictions({ input: '' });
            }}
            // onChange={(newValue) => setValue(newValue)}
            // onInputChange={(newValue) => setInputValue(newValue)}
            // onChange={(newValue) => setValue(newValue)}
            // onInputChange={(newValue) => setInputValue(newValue)}
            // onKeyDown={handleKeyDown}
            onInputChange={(inputValueSelect) => {
              // getPlacePredictions({ input: inputValue });
              onInputChange?.(inputValueSelect);
            }}
            // onCreateOption={(inputValue) => {
            //   // onLocationChange({ label: inputValue, value: inputValue });
            //   // const newOption = onOptionCreateHandler({ label: inputValue, value: inputValue, id: 'CUSTOM_TAG_ID' });
            //   const newOption = createNewOption(inputValue);
            //   onOptionCreateHandler(newOption);
            //   // onChanged(newOption.map((option: any) => option[selectOptionField]));
            //   // if (isMulti) {
            //   //   onChange(inputValue.map((option: any) => option[selectOptionField]));
            //   // } else {
            //   //   onChange(inputValue[selectOptionField]);
            //   // }
            // }}
            // onKeyDown={handleKeyDown}
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
