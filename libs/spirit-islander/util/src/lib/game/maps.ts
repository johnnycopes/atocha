import type { DifficultyOption } from './difficulty';
import type { ExpansionOption } from './expansions';

export interface Map
  extends DifficultyOption<MapName>,
    ExpansionOption<MapName> {}

export type MapName = 'Balanced' | 'Thematic';

export const MAPS: readonly Map[] = [
  {
    name: 'Balanced',
    difficulty: 0,
  },
  {
    name: 'Thematic',
    difficulty: (expansions) => {
      return expansions.some(
        (expansion) =>
          expansion === 'Branch & Claw' || expansion === 'Jagged Earth'
      )
        ? 1
        : 3;
    },
  },
] as const;
