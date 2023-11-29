import { SPIRITS } from '../data';
import {
  Expansion,
  Spirit,
  SpiritFamilyName,
  isPartOfSpiritFamily,
} from '../types';
import { getOptions } from './get-options';

export function getSpirits(
  expansions?: readonly Expansion[]
): readonly Spirit[] {
  const spirits: readonly Spirit[] = getOptions(SPIRITS, expansions);
  if (!expansions) {
    return spirits;
  }

  const result: Spirit[] = [];
  const includedFamilyNames = new Set<SpiritFamilyName>();

  for (const spirit of spirits) {
    const { name, expansion, aspectOf } = spirit;

    if (!aspectOf) {
      if (!expansion || expansions.includes(expansion)) {
        if (isPartOfSpiritFamily(name)) {
          includedFamilyNames.add(name);
        }
        result.push(spirit);
      }
    } else {
      if (
        includedFamilyNames.has(aspectOf) &&
        expansion &&
        expansions.includes(expansion)
      ) {
        result.push(spirit);
      }
    }
  }

  return result;
}
