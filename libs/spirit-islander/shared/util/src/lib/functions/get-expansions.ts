import { EXPANSIONS } from '../data';
import { Expansion } from '../types';

export function getExpansions(): readonly Expansion[] {
  return EXPANSIONS;
}
