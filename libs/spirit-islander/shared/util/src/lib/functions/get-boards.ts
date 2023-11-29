import { BOARDS } from '../data';
import { BalancedBoardName, Board } from '../types';
import { Filters, getOptions } from './get-options';

export function getBoards(filters: Filters<BalancedBoardName> = {}) {
  return getOptions<BalancedBoardName, Board>(BOARDS, filters);
}
