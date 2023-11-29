import { BOARDS } from '../data';
import { Board, Expansion } from '../types';
import { getOptions } from './get-options';

export function getBoards(expansions?: Expansion[]): readonly Board[] {
  return getOptions(BOARDS, expansions);
}
