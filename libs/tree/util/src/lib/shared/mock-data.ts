import { GetChildren, GetId, GetLeafCount, Ids, ReadonlyStates } from './types';

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

export const SOME_SELECTED_STATES: ReadonlyStates = {
  Africa: 'indeterminate',
  Morocco: 'indeterminate',
  'Southern Africa': 'indeterminate',
  Swaziland: 'checked',
  'Northern Africa': 'indeterminate',
  Fes: 'checked',
};

export const SOME_SELECTED_IDS_ARRAY: Ids = ['Swaziland', 'Fes'];

export const ALL_SELECTED_STATES: ReadonlyStates = {
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

export const ALL_SELECTED_IDS_ARRAY: Ids = [
  'Central Africa',
  'Swaziland',
  'Namibia',
  'Marrakesh',
  'Fes',
];

export const getId: GetId<TestItem> = ({ id }) => id;
export const getChildren: GetChildren<TestItem> = ({ children }) =>
  children ?? [];
export const getTargetCount: GetLeafCount<TestItem> = ({ targets }) =>
  targets ?? 0;
