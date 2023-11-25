import { Spirit, SpiritName } from '../types';
import { getNames } from './get-names';

export function getSpiritNames(
  spirits: readonly Spirit[]
): readonly SpiritName[] {
  return getNames(spirits);
}
