import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  maxWidth?: number;
}
const Card = (props: Props) => {
  return (
    <div
      className={`${props.className != null ? props.className : ''} m-auto  my-12 h-auto max-w-[${props.maxWidth}px] rounded-3xl bg-secondary p-8`}
    >
      {props.children}
    </div>
  );
};

export default Card;
