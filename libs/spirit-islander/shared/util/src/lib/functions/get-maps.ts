import { MAPS } from '../data';
import { Filters, Map, MapName } from '../types';
import { getOptionsFactory } from './get-options-factory';

const getOptions = getOptionsFactory<MapName, Map>(MAPS);

export function getMaps(filters: Filters<MapName> = {}) {
  return getOptions(filters);
}
