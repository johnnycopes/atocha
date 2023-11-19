import { Difficulty, Expansion } from '../types';

export function getDifficulty(
  difficulty: Difficulty | ((expansions: readonly Expansion[]) => Difficulty),
  expansions: readonly Expansion[]
): Difficulty {
  return typeof difficulty === 'function' ? difficulty(expansions) : difficulty;
}
