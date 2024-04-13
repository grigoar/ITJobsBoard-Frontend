import React from 'react';

type Props = {
  children: React.ReactNode;
  onSubmitHandler: (_event: React.FormEvent<HTMLFormElement>) => void;
  customStyle?: string;
  addStyles?: string;
};

const FormWrapper = ({ children, onSubmitHandler, customStyle, addStyles }: Props) => {
  return (
    <form
      onSubmit={onSubmitHandler}
      className={`${customStyle != null ? customStyle : `${addStyles} form  flex flex-row flex-wrap items-center`}`}
      autoComplete="off"
    >
      {children}
    </form>
  );
};

export default FormWrapper;
