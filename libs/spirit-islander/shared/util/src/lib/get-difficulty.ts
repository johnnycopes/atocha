import { Difficulty, ExpansionName } from './types';

export function getDifficulty(
  difficulty:
    | Difficulty
    | ((expansions: readonly ExpansionName[]) => Difficulty),
  expansions: readonly ExpansionName[]
): Difficulty {
  return typeof difficulty === 'function' ? difficulty(expansions) : difficulty;
}
