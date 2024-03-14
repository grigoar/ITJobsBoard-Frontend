import React from 'react';

type Props = {
  name: string;
  label: string;
  id: string;
  error?: string;

  [extra: string]: any;
};

const FormInput = ({ name, register, label, id, error, ...inputProps }: Props) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input {...register(name)} id={id} name={name} className="text-black" {...inputProps} />
      <p>{error || ``}&nbsp;</p>
    </>
  );
};

export default FormInput;
