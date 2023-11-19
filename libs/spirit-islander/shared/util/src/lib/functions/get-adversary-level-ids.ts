import { Adversary, AdversaryLevelId } from '../types';

export function getAdversaryLevelIds(
  adversaries: readonly Adversary[]
): AdversaryLevelId[] {
  return adversaries.reduce<AdversaryLevelId[]>((model, adversary) => {
    adversary.levels.forEach((level) => model.push(level.id));
    return model;
  }, []);
}
