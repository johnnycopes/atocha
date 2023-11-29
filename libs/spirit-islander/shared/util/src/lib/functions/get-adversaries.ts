import { ADVERSARIES } from '../data';
import { Adversary, AdversaryName, Filters } from '../types';
import { getOptions } from './get-options';

export function getAdversaries(filters: Filters<AdversaryName> = {}) {
  return getOptions<AdversaryName, Adversary>(ADVERSARIES, filters);
}
