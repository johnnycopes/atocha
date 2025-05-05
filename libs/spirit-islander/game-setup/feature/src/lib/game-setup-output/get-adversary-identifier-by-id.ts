import {
  AdversaryLevelId,
  getAdversaries,
} from '@atocha/spirit-islander/shared/util';

const identifiersById = getAdversaries().reduce<
  Record<AdversaryLevelId, string | undefined>
>(
  (record, adversary) => {
    adversary.levels.forEach(({ id }) => (record[id] = adversary.identifier));
    return record;
  },
  { none: 'No Adversary' } as Record<AdversaryLevelId, string | undefined>
);

export function getAdversaryIdentifierById(
  id: AdversaryLevelId
): string | undefined {
  return identifiersById[id];
}
