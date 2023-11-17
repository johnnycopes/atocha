import { BOARDS } from './data';
import { ExpansionOption } from './option';

export interface Board extends ExpansionOption<BalancedBoardName> {
  thematicName: ThematicBoardName;
}

export type BalancedBoardName = (typeof BOARDS)[number]['name'];

export type ThematicBoardName = (typeof BOARDS)[number]['thematicName'];
