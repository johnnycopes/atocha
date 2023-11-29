import { BOARDS } from '../data';
import { BalancedBoardName, Board } from '../types';
import { Filters } from './filters.interface';
import { getOptions } from './get-options';

export function getBoards(filters: Filters<BalancedBoardName> = {}) {
  return getOptions<BalancedBoardName, Board>(BOARDS, filters);
}
