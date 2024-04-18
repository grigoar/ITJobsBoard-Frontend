import React, { MouseEventHandler } from 'react';

import Select, {
  components,
  GroupBase,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props,
} from 'react-select';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortEndHandler,
  SortableHandle,
} from 'react-sortable-hoc';

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

// ! is not fully working - https://react-select.com/advanced
export const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

function arrayMove<T>(array: readonly T[], from: number, to: number) {
  const slicedArray = array.slice();
  slicedArray.splice(to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0]);
  return slicedArray;
}

const SortableMultiValue = SortableElement((props: MultiValueProps<ColourOption>) => {
  // this prevents the menu from being opened/closed when the user clicks
  // on a value to begin dragging it. ideally, detecting a click (instead of
  // a drag) would still focus the control and toggle the menu, but that
  // requires some magic with refs that are out of scope for this example
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableMultiValueLabel = SortableHandle((props: MultiValueGenericProps) => (
  <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select) as React.ComponentClass<
  Props<ColourOption, true> & SortableContainerProps
>;

export default function MultiSelectSort() {
  const [selected, setSelected] = React.useState<readonly ColourOption[]>([colourOptions[4], colourOptions[5]]);

  const onChange = (selectedOptions: OnChangeValue<ColourOption, true>) => setSelected(selectedOptions);

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    console.log(
      'Values sorted:',
      newValue.map((i) => i.value)
    );
  };

  return (
    <SortableSelect
      useDragHandle
      // react-sortable-hoc props:
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      className="w-full"
      // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      // react-select props:
      isMulti
      options={colourOptions}
      value={selected}
      onChange={onChange}
      components={{
        // @ts-ignore We're failing to provide a required index prop to SortableElement
        MultiValue: SortableMultiValue,
        MultiValueLabel: SortableMultiValueLabel as React.ComponentType<
          MultiValueGenericProps<ColourOption, true, GroupBase<ColourOption>>
        >,
      }}
      closeMenuOnSelect={false}
    />
  );
}
