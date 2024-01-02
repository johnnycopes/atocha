import { AFRICA, TestItem } from '../../shared/mock-data';
import { MOCK_TREE } from './mock-ids';

describe('IdsTree', () => {
  let tree = MOCK_TREE;

  beforeEach(() => {
    tree = MOCK_TREE;
  });

  describe('.descendingIds', () => {
    it("contains a flat array of all nodes' IDs in order from root to leaves", () => {
      expect(tree.descendingIds).toStrictEqual([
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

  describe('.ascendingIds', () => {
    it("contains a flat array of all nodes' IDs in order from leaves to root", () => {
      expect(tree.ascendingIds).toStrictEqual([
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
    it('returns children for tree root', () => {
      expect(tree.getChildrenIds('Africa')).toStrictEqual([
        'Southern Africa',
        'Central Africa',
        'Northern Africa',
      ]);
    });

    it('returns children for middle node in tree', () => {
      expect(tree.getChildrenIds('Northern Africa')).toStrictEqual(['Morocco']);
    });

    it('returns empty array for leaf in tree', () => {
      expect(tree.getChildrenIds('Marrakesh')).toStrictEqual([]);
    });

    it('returns empty array for non-existent node in tree', () => {
      expect(tree.getChildrenIds('Narnia')).toStrictEqual([]);
    });
  });

  describe('getConnectedIds', () => {
    let item: TestItem = AFRICA;

    beforeEach(() => {
      item = AFRICA;
    });

    it('for tree root', () => {
      expect(tree.getConnectedIds(item.id)).toStrictEqual({
        ancestorIds: [],
        nodeAndDescendantIds: [
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
      expect(tree.getConnectedIds('Morocco')).toStrictEqual({
        ancestorIds: ['Northern Africa', 'Africa'],
        nodeAndDescendantIds: ['Morocco', 'Marrakesh', 'Fes'],
      });
    });

    it('for leaf in tree', () => {
      expect(tree.getConnectedIds('Namibia')).toStrictEqual({
        ancestorIds: ['Southern Africa', 'Africa'],
        nodeAndDescendantIds: ['Namibia'],
      });
    });
  });
});
