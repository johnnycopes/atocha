import { MAPS } from '../data';
import { Expansion, Map } from '../types';
import { getOptions } from './get-options';

export function getMaps(expansions?: readonly Expansion[]): readonly Map[] {
  return getOptions(MAPS, { expansions });
}
