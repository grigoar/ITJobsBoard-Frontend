import React from 'react';
import { BsEyeSlash } from 'react-icons/bs';

const PasswordIconOverInputInactive = () => {
  return (
    <BsEyeSlash className="text-[var(--color-blue-light)] transition-all duration-200 ease-in-out hover:scale-125 hover:cursor-pointer" />
  );
};

export default PasswordIconOverInputInactive;
