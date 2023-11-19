import { SPIRITS } from '../data';
import { ExpansionOption } from './option';

export type Spirit = ExpansionOption<SpiritName>;

export type SpiritName = (typeof SPIRITS)[number]['name'];
