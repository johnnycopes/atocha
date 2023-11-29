import { BOARDS } from '../data';
import { BalancedBoardName, Board, Expansion } from '../types';
import { getOptions } from './get-options';

export function getBoards(expansions?: readonly Expansion[]): readonly Board[] {
  return getOptions<BalancedBoardName, Board>(BOARDS, { expansions });
}
