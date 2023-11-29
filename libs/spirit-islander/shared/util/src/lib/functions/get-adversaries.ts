import { ADVERSARIES } from '../data';
import { Adversary, AdversaryName } from '../types';
import { Filters, getOptions } from './get-options';

export function getAdversaries(filters: Filters<AdversaryName> = {}) {
  return getOptions<AdversaryName, Adversary>(ADVERSARIES, filters);
}
