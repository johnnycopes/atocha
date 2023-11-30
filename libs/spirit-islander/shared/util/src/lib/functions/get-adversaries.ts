import { ADVERSARIES } from '../data';
import { Adversary, AdversaryName } from '../types';
import { getOptionsFactory } from './get-options-factory';

export const getAdversaries = getOptionsFactory<AdversaryName, Adversary>(
  ADVERSARIES
);
