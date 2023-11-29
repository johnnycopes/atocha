import { ADVERSARIES } from '../data';
import { Adversary, AdversaryName } from '../types';
import { Filters } from './filters.interface';
import { getOptions } from './get-options';

export function getAdversaries(filters: Filters<AdversaryName> = {}) {
  return getOptions<AdversaryName, Adversary>(ADVERSARIES, filters);
}
