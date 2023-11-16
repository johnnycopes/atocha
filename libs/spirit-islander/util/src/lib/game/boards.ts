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
