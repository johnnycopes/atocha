import { CheckboxStates } from '../../src/lib/nested-checkboxes/nested-checkboxes.component';

export interface NestedItem {
  id: string;
  children?: NestedItem[];
  targets?: number;
}

export const NESTED_ITEM: NestedItem = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      children: [{ id: 'Swaziland', targets: 28 }, { id: 'Namibia', targets: 17 }],
    },
    { id: 'Central Africa', targets: 65 },
    {
      id: 'Northern Africa',
      children: [
        {
          id: 'Morocco',
          children: [{ id: 'Marrakesh', targets: 9 }, { id: 'Fes', targets: 11 }],
        },
      ],
    },
  ],
};

export const SOME_SELECTED: CheckboxStates = {
  Africa: 'indeterminate',
  Morocco: 'indeterminate',
  'Southern Africa': 'indeterminate',
  Swaziland: 'checked',
  'Northern Africa': 'indeterminate',
  Fes: 'checked',
};

export const ALL_SELECTED: CheckboxStates = {
  Africa: 'checked',
  'Southern Africa': 'checked',
  Swaziland: 'checked',
  Namibia: 'checked',
  'Central Africa': 'checked',
  'Northern Africa': 'checked',
  Morocco: 'checked',
  Marrakesh: 'checked',
  Fes: 'checked',
};

export const getId = ({ id }: NestedItem) => id;
export const getChildren = ({ children }: NestedItem) => children ?? [];
export const getCounts = ({ targets }: NestedItem) => targets ?? 0;
