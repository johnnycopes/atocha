import { ADVERSARIES } from '../data';
import { Adversary, AdversaryName, Expansion } from '../types';
import { getOptions } from './get-options';

export function getAdversaries(
  expansions?: readonly Expansion[]
): readonly Adversary[] {
  return getOptions<AdversaryName, Adversary>(ADVERSARIES, { expansions });
}
