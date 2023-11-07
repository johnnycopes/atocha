import { Ids } from './ids';
import { AFRICA, getId, getChildren, TestItem } from '../../shared/mock-data';

describe('Ids', () => {
  let ids = new Ids(AFRICA, getId, getChildren);

  beforeEach(() => {
    ids = new Ids(AFRICA, getId, getChildren);
  });

  describe('.descending', () => {
    it("contains a flat array of all nodes' IDs in order from root to leaves", () => {
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
    it("contains a flat array of all nodes' IDs in order from leaves to root", () => {
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
    it('returns children for root in tree', () => {
      expect(ids.getChildrenIds('Africa')).toEqual([
        'Southern Africa',
        'Central Africa',
        'Northern Africa',
      ]);
    });

    it('returns children for middle node in tree', () => {
      expect(ids.getChildrenIds('Northern Africa')).toEqual(['Morocco']);
    });

    it('returns empty array for leaf in tree', () => {
      expect(ids.getChildrenIds('Marrakesh')).toEqual([]);
    });

    it('returns empty array for non-existent node in tree', () => {
      expect(ids.getChildrenIds('Narnia')).toEqual([]);
    });
  });

  describe('getConnectedIds', () => {
    let item: TestItem = AFRICA;

    beforeEach(() => {
      item = AFRICA;
    });

    it('for root of tree', () => {
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

    it('for middle node in tree', () => {
      expect(ids.getConnectedIds('Morocco')).toEqual({
        ancestorIds: ['Northern Africa', 'Africa'],
        itemAndDescendantsIds: ['Morocco', 'Marrakesh', 'Fes'],
      });
    });

    it('for leaf in tree', () => {
      expect(ids.getConnectedIds('Namibia')).toEqual({
        ancestorIds: ['Southern Africa', 'Africa'],
        itemAndDescendantsIds: ['Namibia'],
      });
    });
  });
});
