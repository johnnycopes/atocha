import { getDynamicValue } from '@atocha/core/util';
import type { Difficulty } from '../types/game/difficulty';
import type { ExpansionName } from '../types/game/expansions';

export function getDifficulty(
  difficulty: Difficulty | ((expansions: ExpansionName[]) => Difficulty),
  expansions: ExpansionName[]
): Difficulty {
  return getDynamicValue(difficulty, expansions);
}
