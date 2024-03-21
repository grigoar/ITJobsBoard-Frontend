import React from 'react';
import constants from '../../../utils/constants';

type Props = {
  height?: string;
  text?: string;
};

const LoadingSpinner = (props: Props) => {
  let lsHeight = '100vh';
  if (props.height === constants.LOADING_SPINNER_HEIGHT_MAX_SCREEN) {
    lsHeight = '100vh';
  }
  if (props.height === constants.LOADING_SPINNER_HEIGHT_MAX_ELEMENT) {
    lsHeight = '100%';
  }
  return (
    <div
      className={`centerItem  flex flex-col items-center justify-center`}
      style={{ height: lsHeight, zIndex: '100' }}
    >
      <div className=" h-10 w-10  animate-spin rounded-[50%] border-8 border-solid border-[var(--color-grey-dark-2)] border-t-[var(--color-grey-light-3)] "></div>
      {props.text != null && props.text !== '' && <div>{props.text}</div>}
    </div>
  );
};

export default LoadingSpinner;
