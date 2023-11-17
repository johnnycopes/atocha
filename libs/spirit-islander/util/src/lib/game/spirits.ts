import { SPIRITS } from './data';
import { ExpansionOption } from './expansions';

export type Spirit = ExpansionOption<SpiritName>;

export type SpiritName = (typeof SPIRITS)[number]['name'];
