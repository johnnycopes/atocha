import { BOARDS } from '../data';
import { ThematicBoardIdentifier } from './identitiers';
import { ExpansionOption } from './option';

export interface Board extends ExpansionOption<BalancedBoardName> {
  thematicName: ThematicBoardName;
  thematicIdentifier: ThematicBoardIdentifier;
}

export type BalancedBoardName = (typeof BOARDS)[number]['name'];

export type ThematicBoardName = (typeof BOARDS)[number]['thematicName'];
