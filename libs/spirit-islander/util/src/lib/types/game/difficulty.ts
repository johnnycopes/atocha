import type { ExpansionName } from './expansions';
import type { Option } from './option';

export const DIFFICULTIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export type Difficulty = typeof DIFFICULTIES[number];

export interface DifficultyOption<TName extends string> extends Option<TName> {
  difficulty: Difficulty | ((expansions: ExpansionName[]) => Difficulty);
}
