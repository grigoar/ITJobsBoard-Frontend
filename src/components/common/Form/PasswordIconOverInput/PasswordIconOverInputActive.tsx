import React from 'react';
import { BsEye } from 'react-icons/bs';

const PasswordIconOverInputActive = () => {
  return (
    <BsEye className="text-[var(--color-green-light)] transition-all duration-200 ease-in-out hover:scale-125 hover:cursor-pointer" />
  );
};

export default PasswordIconOverInputActive;
