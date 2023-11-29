import { MAPS } from '../data';
import { Expansion, Map, MapName } from '../types';
import { getOptions } from './get-options';

export function getMaps(expansions?: readonly Expansion[]): readonly Map[] {
  return getOptions<MapName, Map>(MAPS, { expansions });
}
