import { SPIRITS } from '../data';
import { AspectIdentifier, SpiritIdentifier } from './identitiers';
import { ExpansionOption } from './option';

export interface Spirit extends ExpansionOption<SpiritName> {
  aspectOf?: SpiritFamilyName;
  spiritIdentifier?: SpiritIdentifier;
  aspectIdentifier?: AspectIdentifier;
}

export type SpiritName = (typeof SPIRITS)[number]['name'];

export type SpiritFamilyName = Extract<
  SpiritName,
  | 'A Spread of Rampant Green'
  | 'Bringer of Dreams and Nightmares'
  | 'Heart of the Wildfire'
  | 'Keeper of the Forbidden Wilds'
  | "Lightning's Swift Strike"
  | 'Lure of the Deep Wilderness'
  | "Ocean's Hungry Grasp"
  | 'River Surges in Sunlight'
  | 'Serpent Slumbering Beneath the Island'
  | 'Shadows Flicker Like Flame'
  | 'Sharp Fangs Behind the Leaves'
  | 'Shifting Memory of Ages'
  | 'Shroud of Silent Mist'
  | 'Thunderspeaker'
  | 'Vital Strength of the Earth'
>;

export function isPartOfSpiritFamily(
  name: SpiritName
): name is SpiritFamilyName {
  return (
    name === 'A Spread of Rampant Green' ||
    name === 'Bringer of Dreams and Nightmares' ||
    name === 'Heart of the Wildfire' ||
    name === 'Keeper of the Forbidden Wilds' ||
    name === "Lightning's Swift Strike" ||
    name === 'Lure of the Deep Wilderness' ||
    name === "Ocean's Hungry Grasp" ||
    name === 'River Surges in Sunlight' ||
    name === 'Serpent Slumbering Beneath the Island' ||
    name === 'Shadows Flicker Like Flame' ||
    name === 'Sharp Fangs Behind the Leaves' ||
    name === 'Shifting Memory of Ages' ||
    name === 'Shroud of Silent Mist' ||
    name === 'Thunderspeaker' ||
    name === 'Vital Strength of the Earth'
  );
}
