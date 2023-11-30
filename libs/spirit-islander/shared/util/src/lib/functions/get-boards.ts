import { BOARDS } from '../data';
import { BalancedBoardName, Board, Filters } from '../types';
import { getOptions } from './get-options';

export function getBoards(filters: Filters<BalancedBoardName> = {}) {
  return getOptions<BalancedBoardName, Board>(BOARDS, filters);
}
