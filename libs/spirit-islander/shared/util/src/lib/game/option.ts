import { Difficulty } from './difficulty';
import { ExpansionName } from './expansions';

export interface Option<T extends string> {
  name: T;
}

export interface DifficultyOption<TName extends string> extends Option<TName> {
  difficulty:
    | Difficulty
    | ((expansions: readonly ExpansionName[]) => Difficulty);
}

export interface ExpansionOption<TName extends string> extends Option<TName> {
  expansion?: ExpansionName;
}
