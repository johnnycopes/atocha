import {
  ADVERSARIES,
  AdversaryLevelId,
  AdversaryName,
} from '@atocha/spirit-islander/shared/util';

const namesById = ADVERSARIES.reduce<Record<AdversaryLevelId, AdversaryName>>(
  (accum, adversary) => {
    adversary.levels.forEach(({ id }) => (accum[id] = adversary.name));
    return accum;
  },
  { none: 'No Adversary' } as Record<AdversaryLevelId, AdversaryName>
);

export function getAdversaryNameById(id: AdversaryLevelId): AdversaryName {
  return namesById[id];
}
