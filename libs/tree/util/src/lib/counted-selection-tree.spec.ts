import { CountedSelectionTree } from './counted-selection-tree';
import {
  getId,
  getChildren,
  getTargetCount,
  AFRICA,
  ALL_SELECTED_IDS,
  SOME_SELECTED_IDS,
} from './shared/mock-data';

describe('CountedSelectionTree', () => {
  describe('initializing', () => {
    it('returns total counts when passed empty collection of IDs', () => {
      const tree = new CountedSelectionTree(
        AFRICA,
        getId,
        getChildren,
        getTargetCount
      );

      expect(tree.getSelectedCount('Africa')).toBe(0);
      expect(tree.getSelectedCount('Central Africa')).toBe(0);
      expect(tree.getSelectedCount('Fes')).toBe(0);
      expect(tree.getSelectedCount('Marrakesh')).toBe(0);
      expect(tree.getSelectedCount('Morocco')).toBe(0);
      expect(tree.getSelectedCount('Namibia')).toBe(0);
      expect(tree.getSelectedCount('Northern Africa')).toBe(0);
      expect(tree.getSelectedCount('Southern Africa')).toBe(0);
      expect(tree.getSelectedCount('Swaziland')).toBe(0);

      expect(tree.getTotalCount('Africa')).toBe(130);
      expect(tree.getTotalCount('Central Africa')).toBe(65);
      expect(tree.getTotalCount('Fes')).toBe(11);
      expect(tree.getTotalCount('Marrakesh')).toBe(9);
      expect(tree.getTotalCount('Morocco')).toBe(20);
      expect(tree.getTotalCount('Namibia')).toBe(17);
      expect(tree.getTotalCount('Northern Africa')).toBe(20);
      expect(tree.getTotalCount('Southern Africa')).toBe(45);
      expect(tree.getTotalCount('Swaziland')).toBe(28);
    });
  });

  describe('updating', () => {
    it('returns correct counts records after updating to partial collection of IDs', () => {
      const tree = new CountedSelectionTree(
        AFRICA,
        getId,
        getChildren,
        getTargetCount
      );

      tree.updateCounts(SOME_SELECTED_IDS);

      expect(tree.getSelectedCount('Africa')).toBe(39);
      expect(tree.getSelectedCount('Central Africa')).toBe(0);
      expect(tree.getSelectedCount('Fes')).toBe(11);
      expect(tree.getSelectedCount('Marrakesh')).toBe(0);
      expect(tree.getSelectedCount('Morocco')).toBe(11);
      expect(tree.getSelectedCount('Namibia')).toBe(0);
      expect(tree.getSelectedCount('Northern Africa')).toBe(11);
      expect(tree.getSelectedCount('Southern Africa')).toBe(28);
      expect(tree.getSelectedCount('Swaziland')).toBe(28);

      expect(tree.getTotalCount('Africa')).toBe(130);
      expect(tree.getTotalCount('Central Africa')).toBe(65);
      expect(tree.getTotalCount('Fes')).toBe(11);
      expect(tree.getTotalCount('Marrakesh')).toBe(9);
      expect(tree.getTotalCount('Morocco')).toBe(20);
      expect(tree.getTotalCount('Namibia')).toBe(17);
      expect(tree.getTotalCount('Northern Africa')).toBe(20);
      expect(tree.getTotalCount('Southern Africa')).toBe(45);
      expect(tree.getTotalCount('Swaziland')).toBe(28);
    });

    it('returns correct counts records after updating to full collection of IDs', () => {
      const tree = new CountedSelectionTree(
        AFRICA,
        getId,
        getChildren,
        getTargetCount
      );

      tree.updateCounts(ALL_SELECTED_IDS);

      expect(tree.getSelectedCount('Africa')).toBe(130);
      expect(tree.getSelectedCount('Central Africa')).toBe(65);
      expect(tree.getSelectedCount('Fes')).toBe(11);
      expect(tree.getSelectedCount('Marrakesh')).toBe(9);
      expect(tree.getSelectedCount('Morocco')).toBe(20);
      expect(tree.getSelectedCount('Namibia')).toBe(17);
      expect(tree.getSelectedCount('Northern Africa')).toBe(20);
      expect(tree.getSelectedCount('Southern Africa')).toBe(45);
      expect(tree.getSelectedCount('Swaziland')).toBe(28);

      expect(tree.getTotalCount('Africa')).toBe(130);
      expect(tree.getTotalCount('Central Africa')).toBe(65);
      expect(tree.getTotalCount('Fes')).toBe(11);
      expect(tree.getTotalCount('Marrakesh')).toBe(9);
      expect(tree.getTotalCount('Morocco')).toBe(20);
      expect(tree.getTotalCount('Namibia')).toBe(17);
      expect(tree.getTotalCount('Northern Africa')).toBe(20);
      expect(tree.getTotalCount('Southern Africa')).toBe(45);
      expect(tree.getTotalCount('Swaziland')).toBe(28);
    });
  });
});
