import { SPIRITS } from '../data';
import { ExpansionOption } from './option';

export interface Spirit extends ExpansionOption<SpiritName> {
  aspectOf?: SpiritFamilyName;
}

export type SpiritName = (typeof SPIRITS)[number]['name'];

export type SpiritFamilyName = Extract<
  SpiritName,
  | "Lightning's Swift Strike"
  | 'River Surges in Sunlight'
  | 'Shadows Flicker Like Flame'
  | 'Vital Strength of the Earth'
>;

export function isPartOfSpiritFamily(
  name: SpiritName
): name is SpiritFamilyName {
  return (
    name === "Lightning's Swift Strike" ||
    name === 'River Surges in Sunlight' ||
    name === 'Shadows Flicker Like Flame' ||
    name === 'Vital Strength of the Earth'
  );
}
