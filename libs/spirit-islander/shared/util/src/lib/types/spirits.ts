import { SPIRITS } from '../data';
import { ExpansionOption } from './option';

export interface Spirit extends ExpansionOption<SpiritName> {
  derivesFrom?: SpiritName;
}

export type SpiritName = (typeof SPIRITS)[number]['name'];
