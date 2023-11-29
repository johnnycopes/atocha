import { DIFFICULTIES } from '../data';
import { Difficulty } from '../types';

export function getDifficulties(): readonly Difficulty[] {
  return DIFFICULTIES;
}
