import { Ids, IdsMap } from './ids';
import { AFRICA, getId, getChildren, TestItem } from '../mock-data';

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

  describe('.descending', () => {
    it("contains a flat array of all tree nodes' IDs in order from root to leaves", () => {
      expect(ids.descending).toEqual([
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

  describe('.ascending', () => {
    it("contains a flat array of all tree nodes' IDs in order from leaves to root", () => {
      expect(ids.ascending).toEqual([
        'Fes',
        'Marrakesh',
        'Morocco',
        'Namibia',
        'Swaziland',
        'Northern Africa',
        'Central Africa',
        'Southern Africa',
        'Africa',
      ]);
    });
  });

  describe('getChildrenIds', () => {
    it('returns children for root item', () => {
      expect(ids.getChildrenIds('Africa')).toEqual([
        'Southern Africa',
        'Central Africa',
        'Northern Africa',
      ]);
    });

    it('returns children for middle item', () => {
      expect(ids.getChildrenIds('Northern Africa')).toEqual(['Morocco']);
    });

    it('returns empty array for leaf item', () => {
      expect(ids.getChildrenIds('Marrakesh')).toEqual([]);
    });

    it('returns empty array for non-existent item', () => {
      expect(ids.getChildrenIds('Narnia')).toEqual([]);
    });
  });

  describe('getConnectedIds', () => {
    let item: TestItem = AFRICA;

    beforeEach(() => {
      item = AFRICA;
    });

    it('for root item in tree', () => {
      expect(ids.getConnectedIds(item.id)).toEqual({
        ancestorIds: [],
        itemAndDescendantsIds: [
          'Africa',
          'Southern Africa',
          'Central Africa',
          'Northern Africa',
          'Swaziland',
          'Namibia',
          'Morocco',
          'Marrakesh',
          'Fes',
        ],
      });
    });

    it('for middle item in tree', () => {
      item = AFRICA.children
        ?.find(({ id }) => id === 'Northern Africa')
        ?.children?.find(({ id }) => id === 'Morocco') ?? { id: 'Morocco' };

      expect(ids.getConnectedIds(item.id)).toEqual({
        ancestorIds: ['Northern Africa', 'Africa'],
        itemAndDescendantsIds: ['Morocco', 'Marrakesh', 'Fes'],
      });
    });

    it('for leaf item in tree', () => {
      item = AFRICA.children
        ?.find(({ id }) => id === 'Southern Africa')
        ?.children?.find(({ id }) => id === 'Namibia') ?? { id: 'Namibia' };

      expect(ids.getConnectedIds(item.id)).toEqual({
        ancestorIds: ['Southern Africa', 'Africa'],
        itemAndDescendantsIds: ['Namibia'],
      });
    });
  });
});
