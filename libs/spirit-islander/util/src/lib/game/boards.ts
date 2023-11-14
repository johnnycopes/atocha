import type { ExpansionOption } from './expansions';

export interface Board extends ExpansionOption<BalancedBoardName> {
  thematicName: ThematicBoardName;
}

export type BalancedBoardName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type ThematicBoardName =
  | 'Northeast'
  | 'East'
  | 'Northwest'
  | 'West'
  | 'Southeast'
  | 'Southwest';

export const BOARDS: readonly Board[] = [
  {
    name: 'A',
    thematicName: 'Northeast',
  },
  {
    name: 'B',
    thematicName: 'East',
  },
  {
    name: 'C',
    thematicName: 'Northwest',
  },
  {
    name: 'D',
    thematicName: 'West',
  },
  {
    name: 'E',
    thematicName: 'Southeast',
    expansion: 'Jagged Earth',
  },
  {
    name: 'F',
    thematicName: 'Southwest',
    expansion: 'Jagged Earth',
  },
];
