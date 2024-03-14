import Link from 'next/link';
import React from 'react';

interface Props {
  link?: string;
  style?: string;
  children: React.ReactNode;
  action?: () => void;
  isDisabled?: boolean;
  areaLabelCustom?: string;
}
const Button = (props: Props) => {
  if (props.link) {
    return (
      <Link
        href={props.link}
        onClick={props.action}
        tabIndex={0}
        className={`cursor-pointer  ${props.style ? props.style : ''}`}
        aria-label={`${props.areaLabelCustom || ''}`}
      >
        {/* <a className={`${classes.buttonGen} ${props.style ? props.style : ''}`}>{props.children}</a> */}
        {props.children}
      </Link>
    );
  }

  return (
    <button
      onClick={props.action}
      disabled={props.isDisabled}
      tabIndex={0}
      className={`cursor-pointer  ${props.style ? props.style : ''}`}
      aria-label={`${props.areaLabelCustom || ''}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
