import { BOARDS } from './data';
import type { ExpansionOption } from './expansions';

export interface Board extends ExpansionOption<BalancedBoardName> {
  thematicName: ThematicBoardName;
}

export type BalancedBoardName = (typeof BOARDS)[number]['name'];

export type ThematicBoardName = (typeof BOARDS)[number]['thematicName'];
