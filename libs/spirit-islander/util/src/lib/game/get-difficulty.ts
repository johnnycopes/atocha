import type { Difficulty } from './difficulty';
import type { ExpansionName } from './expansions';

export function getDifficulty(
  difficulty: Difficulty | ((expansions: ExpansionName[]) => Difficulty),
  expansions: ExpansionName[]
): Difficulty {
  return typeof difficulty === 'function' ? difficulty(expansions) : difficulty;
}
