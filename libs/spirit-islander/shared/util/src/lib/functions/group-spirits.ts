import { SPIRITS } from '../game';
import {
  SpiritFamilyName,
  Spirit,
  SpiritName,
  isPartOfSpiritFamily,
} from '../types';
import { getOptionsByName } from './get-options-by-name';

export function groupSpirits(
  names: readonly SpiritName[]
): Readonly<Record<'General' | SpiritFamilyName, readonly Spirit[]>> {
  const spirits: Record<'General' | SpiritFamilyName, Spirit[]> = {
    General: [],
    "Lightning's Swift Strike": [],
    'River Surges in Sunlight': [],
    'Shadows Flicker Like Flame': [],
    'Vital Strength of the Earth': [],
  };

  for (const spirit of getOptionsByName(SPIRITS, names)) {
    if (isPartOfSpiritFamily(spirit.name)) {
      spirits[spirit.name].push(spirit);
    } else if (spirit.aspectOf && isPartOfSpiritFamily(spirit.aspectOf)) {
      spirits[spirit.aspectOf].push(spirit);
    } else {
      spirits.General.push(spirit);
    }
  }

  return spirits;
}
