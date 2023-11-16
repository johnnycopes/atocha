import { AdversaryLevelId, AdversaryName } from './adversaries';
import { Options } from './options';

const { adversaries } = new Options();
const adversaryLevelIdDict = adversaries.reduce(
  (accum, adversary) => {
    adversary.levels.forEach((level) => (accum[level.id] = adversary.name));
    return accum;
  },
  { none: 'No Adversary' } as Record<AdversaryLevelId, AdversaryName>
);

export function getAdversaryById(id: AdversaryLevelId): AdversaryName {
  return adversaryLevelIdDict[id];
}
