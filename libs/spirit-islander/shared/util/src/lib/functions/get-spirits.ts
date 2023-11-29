import { SPIRITS } from '../data';
import {
  Filters,
  Spirit,
  SpiritFamilyName,
  SpiritName,
  isPartOfSpiritFamily,
} from '../types';
import { getOptions } from './get-options';

export function getSpirits(filters: Filters<SpiritName> = {}) {
  const spirits: readonly Spirit[] = getOptions<SpiritName, Spirit>(
    SPIRITS,
    filters
  );
  if (!filters.expansions) {
    return spirits;
  }

  const result: Spirit[] = [];
  const includedFamilyNames = new Set<SpiritFamilyName>();

  for (const spirit of spirits) {
    const { name, expansion, aspectOf } = spirit;

    if (!aspectOf) {
      if (!expansion || filters.expansions.includes(expansion)) {
        if (isPartOfSpiritFamily(name)) {
          includedFamilyNames.add(name);
        }
        result.push(spirit);
      }
    } else {
      if (
        includedFamilyNames.has(aspectOf) &&
        expansion &&
        filters.expansions.includes(expansion)
      ) {
        result.push(spirit);
      }
    }
  }

  return result;
}
