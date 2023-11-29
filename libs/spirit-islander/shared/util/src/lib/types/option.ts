import { Difficulty } from './difficulty';
import { Expansion } from './expansions';

export interface Option<T extends string> {
  name: T;
}

export interface DifficultyOption<TName extends string> extends Option<TName> {
  difficulty: Difficulty | ((expansions: readonly Expansion[]) => Difficulty);
}

export interface ExpansionOption<TName extends string> extends Option<TName> {
  expansion?: Expansion;
}

export interface Filters<TName extends string> {
  names?: readonly TName[];
  expansions?: readonly Expansion[];
}
