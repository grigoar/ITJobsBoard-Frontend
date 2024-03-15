import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Card = (props: Props) => {
  return (
    <div
      className={`${props.className != null ? props.className : ''} m-auto  my-12 h-auto rounded-3xl bg-secondary p-8 `}
    >
      {props.children}
    </div>
  );
};

export default Card;
