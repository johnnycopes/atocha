import { DIFFICULTIES } from './data';
import type { ExpansionName } from './expansions';
import type { Option } from './option';

export type Difficulty = (typeof DIFFICULTIES)[number];

export interface DifficultyOption<TName extends string> extends Option<TName> {
  difficulty:
    | Difficulty
    | ((expansions: readonly ExpansionName[]) => Difficulty);
}
