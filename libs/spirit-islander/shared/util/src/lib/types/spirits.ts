import { SPIRITS } from '../data';
import { ExpansionOption } from './option';

export interface Spirit extends ExpansionOption<SpiritName> {
  derivesFrom?: AspectsSpiritName;
}

export type SpiritName = (typeof SPIRITS)[number]['name'];

export type AspectsSpiritName = Extract<
  SpiritName,
  | "Lightning's Swift Strike"
  | 'River Surges in Sunlight'
  | 'Shadows Flicker Like Flame'
  | 'Vital Strength of the Earth'
>;

export function isPossibleAspect(name: SpiritName): name is AspectsSpiritName {
  return (
    name === "Lightning's Swift Strike" ||
    name === 'River Surges in Sunlight' ||
    name === 'Shadows Flicker Like Flame' ||
    name === 'Vital Strength of the Earth'
  );
}
