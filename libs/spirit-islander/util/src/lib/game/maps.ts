import type { DifficultyOption } from './difficulty';
import type { ExpansionOption } from './expansions';

export interface Map
  extends DifficultyOption<MapName>,
    ExpansionOption<MapName> {}

export type MapName = 'Balanced' | 'Thematic';
