import { BOARDS } from '../data';
import { BalancedBoardName, Board, Filters } from '../types';
import { getOptionsFactory } from './get-options-factory';

const getOptions = getOptionsFactory<BalancedBoardName, Board>(BOARDS);

export function getBoards(filters: Filters<BalancedBoardName> = {}) {
  return getOptions(filters);
}
