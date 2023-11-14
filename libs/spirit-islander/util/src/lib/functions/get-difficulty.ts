import type { Difficulty } from '../game/difficulty';
import type { ExpansionName } from '../game/expansions';

export function getDifficulty(
  difficulty: Difficulty | ((expansions: ExpansionName[]) => Difficulty),
  expansions: ExpansionName[]
): Difficulty {
  return typeof difficulty === 'function' ? difficulty(expansions) : difficulty;
}
