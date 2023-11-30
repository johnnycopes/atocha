import { SPIRITS } from '../data';
import {
  Spirit,
  SpiritFamilyName,
  SpiritName,
  isPartOfSpiritFamily,
} from '../types';
import { getOptionsFactory } from './get-options-factory';

export const getSpirits = getOptionsFactory<SpiritName, Spirit>(SPIRITS, {
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
