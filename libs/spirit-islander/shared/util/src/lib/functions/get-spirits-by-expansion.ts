import {
  Expansion,
  Spirit,
  SpiritFamilyName,
  isPartOfSpiritFamily,
} from '../types';

export function getSpiritsByExpansion(
  spirits: readonly Spirit[],
  expansions: readonly Expansion[]
): readonly Spirit[] {
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
