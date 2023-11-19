import { MAPS } from './data';
import { DifficultyOption, ExpansionOption } from './option';

export interface Map
  extends DifficultyOption<MapName>,
    ExpansionOption<MapName> {}

export type MapName = (typeof MAPS)[number]['name'];
