import {
  AdversaryLevelId,
  AdversaryName,
  getAdversaries,
} from '@atocha/spirit-islander/shared/util';

const namesById = getAdversaries().reduce<
  Record<AdversaryLevelId, AdversaryName>
>(
  (record, adversary) => {
    adversary.levels.forEach(({ id }) => (record[id] = adversary.name));
    return record;
  },
  { none: 'No Adversary' } as Record<AdversaryLevelId, AdversaryName>
);

export function getAdversaryNameById(id: AdversaryLevelId): AdversaryName {
  return namesById[id];
}
