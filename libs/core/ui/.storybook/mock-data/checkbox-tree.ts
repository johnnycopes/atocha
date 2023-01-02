import { CheckboxStates } from '../../src/lib/checkbox-tree/checkbox-tree.component';

export interface TestItem {
  id: string;
  children?: TestItem[];
  targets?: number;
}

export const AFRICA: TestItem = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      children: [
        { id: 'Swaziland', targets: 28 },
        { id: 'Namibia', targets: 17 },
      ],
    },
    { id: 'Central Africa', targets: 65 },
    {
      id: 'Northern Africa',
      children: [
        {
          id: 'Morocco',
          children: [
            { id: 'Marrakesh', targets: 9 },
            { id: 'Fes', targets: 11 },
          ],
        },
      ],
    },
  ],
};

export const SMALL_AFRICA: TestItem = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      children: [{ id: 'Swaziland', targets: 28 }],
    },
    {
      id: 'Northern Africa',
      children: [
        {
          id: 'Morocco',
          children: [{ id: 'Fes', targets: 11 }],
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

export const SOME_SELECTED_NEW = ['Swaziland', 'Fes'];

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

export const ALL_SELECTED_NEW = [
  'Central Africa',
  'Swaziland',
  'Namibia',
  'Marrakesh',
  'Fes',
];

export const getId = ({ id }: TestItem) => id;
export const getChildren = ({ children }: TestItem) => children ?? [];
export const getCounts = ({ targets }: TestItem) => targets ?? 0;
