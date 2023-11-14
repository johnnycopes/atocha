import type { Map } from '../types/game/maps';

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
