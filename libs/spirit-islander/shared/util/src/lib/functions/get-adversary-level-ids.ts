import { Adversary, AdversaryLevelId } from '../types';

export function getAdversaryLevelIds(
  adversaries: readonly Adversary[]
): AdversaryLevelId[] {
  return adversaries.reduce<AdversaryLevelId[]>((ids, adversary) => {
    adversary.levels.forEach(({ id }) => ids.push(id));
    return ids;
  }, []);
}
