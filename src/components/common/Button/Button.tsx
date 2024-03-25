import Link from 'next/link';
import React, { useEffect } from 'react';

interface Props {
  link?: string;
  style?: string;
  children: React.ReactNode;
  action?: () => void;
  isDisabled?: boolean;
  areaLabelCustom?: string;
  type?: 'button' | 'submit' | 'reset';
  focus?: boolean;
}
const Button = (props: Props) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (props.focus && linkRef.current) {
      linkRef.current.focus();
    }
    if (props.focus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [props.focus]);

  if (props.link) {
    return (
      <Link
        ref={linkRef}
        href={props.link}
        onClick={props.action}
        tabIndex={0}
        className={`cursor-pointer  ${props.style ? props.style : ''} `}
        aria-label={`${props.areaLabelCustom || ''}`}
      >
        {/* <a className={`${classes.buttonGen} ${props.style ? props.style : ''}`}>{props.children}</a> */}
        {props.children}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={props.action}
      disabled={props.isDisabled}
      tabIndex={0}
      className={`cursor-pointer  ${props.style ? props.style : ''}`}
      aria-label={`${props.areaLabelCustom || ''}`}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
};

export default Button;
