import { Ids, IdsMap } from './ids';
import { AFRICA, getId, getChildren } from '../mock-data';

describe('Ids', () => {
  let ids = new Ids(AFRICA, getId, getChildren);

  beforeEach(() => {
    ids = new Ids(AFRICA, getId, getChildren);
  });

  describe('.map', () => {
    it("contains a flat map structure with references to every node's parent ID and children IDs", () => {
      expect(ids.map).toEqual<IdsMap>(
        new Map([
          [
            'Africa',
            {
              parentId: undefined,
              childrenIds: [
                'Southern Africa',
                'Central Africa',
                'Northern Africa',
              ],
            },
          ],
          [
            'Southern Africa',
            { parentId: 'Africa', childrenIds: ['Swaziland', 'Namibia'] },
          ],
          ['Central Africa', { parentId: 'Africa', childrenIds: [] }],
          ['Northern Africa', { parentId: 'Africa', childrenIds: ['Morocco'] }],
          ['Swaziland', { parentId: 'Southern Africa', childrenIds: [] }],
          ['Namibia', { parentId: 'Southern Africa', childrenIds: [] }],
          [
            'Morocco',
            { parentId: 'Northern Africa', childrenIds: ['Marrakesh', 'Fes'] },
          ],
          ['Marrakesh', { parentId: 'Morocco', childrenIds: [] }],
          ['Fes', { parentId: 'Morocco', childrenIds: [] }],
        ])
      );
    });
  });

  describe('.arr', () => {
    it("contains a flat array of all node's IDs", () => {
      expect(ids.arr).toEqual([
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
});
