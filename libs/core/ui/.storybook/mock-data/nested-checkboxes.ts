import { CheckboxStates } from '../../src/lib/nested-checkboxes/nested-checkboxes.component';

export interface NestedItem {
  id: string;
  children?: NestedItem[];
}

export const NESTED_ITEM: NestedItem = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      children: [{ id: 'Swaziland' }, { id: 'Namibia' }],
    },
    { id: 'Central Africa' },
    {
      id: 'Northern Africa',
      children: [
        {
          id: 'Morocco',
          children: [{ id: 'Marrakesh' }, { id: 'Fes' }],
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
