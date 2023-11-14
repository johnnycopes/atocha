import type { Difficulty } from '../data/difficulty';
import type { ExpansionName } from '../data/expansions';

export function getDifficulty(
  difficulty: Difficulty | ((expansions: ExpansionName[]) => Difficulty),
  expansions: ExpansionName[]
): Difficulty {
  return typeof difficulty === 'function' ? difficulty(expansions) : difficulty;
}
