import { SPIRITS } from '../data';
import {
  Filters,
  Spirit,
  SpiritFamilyName,
  SpiritName,
  isPartOfSpiritFamily,
} from '../types';
import { getOptionsFactory } from './get-options-factory';

const getOptions = getOptionsFactory<SpiritName, Spirit>(SPIRITS, {
  filterExpansions: (spirits, expansions) => {
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
  },
});

export function getSpirits(filters: Filters<SpiritName> = {}) {
  return getOptions(filters);
}
