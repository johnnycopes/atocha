import { MAPS } from '../data';
import { Map, MapName } from '../types';
import { getOptionsFactory } from './get-options-factory';

export const getMaps = getOptionsFactory<MapName, Map>(MAPS);
