import { MAPS } from '../data';
import { Filters, Map, MapName } from '../types';
import { getOptions } from './get-options';

export function getMaps(filters: Filters<MapName> = {}) {
  return getOptions<MapName, Map>(MAPS, filters);
}
