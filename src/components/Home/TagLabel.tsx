import React from 'react';

type Props = {
  name: string;
  color?: string;
  colorHover?: string;
};

const TagLabel = ({ name, color }: Props) => {
  const colorDefault = color || 'var(--text-color-calm-strong)';
  return (
    <div
      style={{ border: `1px solid ${colorDefault}` }}
      className={`mb-1 mr-1 inline-block rounded-xl border-2 p-1 text-sm `}
    >
      {name}
    </div>
  );
};

export default TagLabel;
