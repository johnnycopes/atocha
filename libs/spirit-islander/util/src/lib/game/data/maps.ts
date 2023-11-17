import { ExpansionName } from '../expansions';

export const MAPS = [
  {
    name: 'Balanced',
    difficulty: 0,
  },
  {
    name: 'Thematic',
    difficulty: (expansions: readonly ExpansionName[]) => {
      return expansions.some(
        (expansion) =>
          expansion === 'Branch & Claw' || expansion === 'Jagged Earth'
      )
        ? 1
        : 3;
    },
  },
] as const;
