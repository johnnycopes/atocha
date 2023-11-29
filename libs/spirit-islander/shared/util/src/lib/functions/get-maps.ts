import { MAPS } from '../data';
import { Map, MapName } from '../types';
import { Filters } from './filters.interface';
import { getOptions } from './get-options';

export function getMaps(filters: Filters<MapName> = {}) {
  return getOptions<MapName, Map>(MAPS, filters);
}
