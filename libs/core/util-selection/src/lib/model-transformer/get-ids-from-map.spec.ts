import { getIdsFromMap } from './get-ids-from-map';
import { createIdsMap } from './create-ids-map';
import { AFRICA, getChildren, getId } from '../mock-data';

describe('getIdsFromMap', () => {
  it('returns all IDs from an IdsMap', () => {
    const map = createIdsMap(AFRICA, getId, getChildren);

    expect(getIdsFromMap(map)).toEqual([
      'Africa',
      'Southern Africa',
      'Central Africa',
      'Northern Africa',
      'Swaziland',
      'Namibia',
      'Morocco',
      'Marrakesh',
      'Fes',
    ]);
  });
});
