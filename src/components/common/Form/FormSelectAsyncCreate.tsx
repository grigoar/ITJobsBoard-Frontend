import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
// import Select from 'react-select';
// import AsyncCreatableSelect from 'react-select/async-creatable';
// import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

type LocationPlaces = {
  label: string;
  value: string;
};

type FormSelectProps = {
  label: string;
  control: any;
  options: LocationPlaces[];
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
  setValue?: any;
  onInputChange?: any;
};

const FormSelectAsyncCreate = ({
  selectOptionField,
  selectOptionLabel,
  inputValueField,
  control,
  options,
  label,
  handleOptionsChange,
  watchField,
  setValue,
  errors,
  dirtyField,
  extraError,
  submitted,
  styling,
  isSearchable = true,
  isMulti = false,
  onInputChange,
}: FormSelectProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [optionsExtended, setOptionsExtended] = useState<LocationPlaces[]>([]);
  const [userCustomOptions, setUserCustomOptions] = useState<LocationPlaces[]>([]);
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

  useEffect(() => {
    setOptionsExtended([...options, ...userCustomOptions]);
  }, [options, userCustomOptions]);

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

  const onOptionCreateHandler = (place: LocationPlaces) => {
    setOptionsExtended([...options, ...userCustomOptions, place]);
    setUserCustomOptions([...userCustomOptions, place]);
    setValue(inputValueField, place.value);
  };

  // console.log('googlePlaces+++++++++++++++++', googlePlaces);
  // console.log('optionsExtended+++++++++++++++++', optionsExtended);

  return (
    <div className="cursor-pointe4 ![&>input:focus-visible]:outline-none  w-full [&>div:focus]:border-4">
      <label className="block  ">{label}</label>
      <Controller
        // name="companyID"
        name={inputValueField}
        control={control}
        render={({ field: { onChange: onChanged, value, ref } }) => (
          // <AsyncCreatableSelect
          // <Select
          <CreatableSelect
            // value={profileCompanies.find((company) => company.id === value)}
            // value={options.find((option: any) => option[selectOptionField] === value)}
            value={optionsExtended.find((option: any) => option[selectOptionField] === value)}
            ref={ref}
            onChange={async (selectedOption: any) => {
              // onChange(selectedCompany?.id);
              if (isMulti) {
                onChanged(selectedOption.map((option: any) => option[selectOptionField]));
              } else {
                onChanged(selectedOption[selectOptionField]);
              }

              // * something in the future
              handleOptionsChange?.(selectedOption);
            }}
            // options={googlePlaces}
            options={optionsExtended}
            className={`w-full cursor-pointer border-2 border-[var(--color-blue-light)]  ${isInputProcessingClass} ${isInputInvalidClass} ${isFocusedAndValid} ${errorMessages.length === 0 ? 'mb-4' : 'mb-0'} ![&>input:focus-visible]:outline-none rounded-md text-[var(--color-grey-dark-5)] focus:outline-none ${styling}    [&_input:focus-within]:!shadow-none [&_input]:!min-w-[60px]`}
            // getOptionLabel={(option) => option.name}
            getOptionLabel={(option) => option[selectOptionLabel]}
            // getOptionValue={(option) => option.id}
            getOptionValue={(option) => option[selectOptionField]}
            // TODO: the text search outline styling is broken
            isSearchable={isSearchable}
            isMulti={isMulti}
            // isSearchable={false}
            // closeMenuOnSelect={!isMulti}
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
            onInputChange={(inputValue) => {
              // getPlacePredictions({ input: inputValue });
              onInputChange?.(inputValue);
            }}
            onCreateOption={(inputValue) => {
              // onLocationChange({ label: inputValue, value: inputValue });
              onOptionCreateHandler({ label: inputValue, value: inputValue });

              // if (isMulti) {
              //   onChange(inputValue.map((option: any) => option[selectOptionField]));
              // } else {
              //   onChange(inputValue[selectOptionField]);
              // }
            }}
          />
        )}
        rules={{ required: true }}
      />
    </div>
  );
};

export default FormSelectAsyncCreate;
