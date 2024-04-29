type Props = {
  name: string;
  values: string[];
  color?: string;
  colorHover?: string;
};

const TagLabelDetails = ({ name, values, color }: Props) => {
  const colorDefault = color || 'var(--text-color-calm-strong)';
  return (
    <div
      style={{ border: `1px solid ${colorDefault}` }}
      className={`mb-1 mr-1 flex h-[80px] w-[150px] flex-col items-center  justify-center rounded-xl border-2 p-1 text-sm font-semibold`}
    >
      <div className="text-center text-[var(--color-blue-light)]">{name}</div>
      <div className="mt-2 inline-block text-center text-lg"> {values.join(', ')}</div>
    </div>
  );
};

export default TagLabelDetails;
