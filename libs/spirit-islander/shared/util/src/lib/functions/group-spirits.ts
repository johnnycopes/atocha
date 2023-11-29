import {
  SpiritFamilyName,
  Spirit,
  SpiritName,
  isPartOfSpiritFamily,
} from '../types';
import { getOptionsByName } from './get-options-by-name';
import { getSpirits } from './get-spirits';

export function groupSpirits(
  names: readonly SpiritName[]
): Readonly<Record<'General' | SpiritFamilyName, readonly Spirit[]>> {
  const spirits: Record<'General' | SpiritFamilyName, Spirit[]> = {
    General: [],
    'A Spread of Rampant Green': [],
    'Bringer of Dreams and Nightmares': [],
    'Heart of the Wildfire': [],
    'Keeper of the Forbidden Wilds': [],
    "Lightning's Swift Strike": [],
    'Lure of the Deep Wilderness': [],
    "Ocean's Hungry Grasp": [],
    'River Surges in Sunlight': [],
    'Serpent Slumbering Beneath the Island': [],
    'Shadows Flicker Like Flame': [],
    'Sharp Fangs Behind the Leaves': [],
    'Shifting Memory of Ages': [],
    'Shroud of Silent Mist': [],
    Thunderspeaker: [],
    'Vital Strength of the Earth': [],
  };

  for (const spirit of getOptionsByName(getSpirits(), names)) {
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
