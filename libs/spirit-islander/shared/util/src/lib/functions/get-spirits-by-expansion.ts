import { Expansion, Spirit, SpiritName } from '../types';
import { getOptionsByExpansion } from './get-options-by-expansion';

export function getSpiritsByExpansion(
  spirits: readonly Spirit[],
  expansions: readonly Expansion[]
): readonly Spirit[] {
  return getOptionsByExpansion<SpiritName, Spirit>(spirits, expansions);
}
