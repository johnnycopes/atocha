import { ADVERSARIES } from '../data';
import { Adversary, AdversaryName, Filters } from '../types';
import { getOptionsFactory } from './get-options-factory';

const getOptions = getOptionsFactory<AdversaryName, Adversary>(ADVERSARIES);

export function getAdversaries(filters: Filters<AdversaryName> = {}) {
  return getOptions(filters);
}
