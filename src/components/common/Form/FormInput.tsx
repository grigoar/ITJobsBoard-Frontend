import React from 'react';

type Props = {
  name: string;
  label: string;
  id: string;
  errors?: string;

  [extra: string]: any;
};

const FormInput = ({ name, register, label, id, errors, ...inputProps }: Props) => {
  const errorMessages =
    errors?.split(',').map((error: string, index) => {
      return <li key={index}>{error}</li>;
    }) || [];

  return (
    <>
      <label className="w-full" htmlFor={id}>
        {label}
      </label>
      <input {...register(name)} id={id} name={name} className="w-full text-black" {...inputProps} />
      <ul>{errorMessages}&nbsp;</ul>
    </>
  );
};

export default FormInput;
