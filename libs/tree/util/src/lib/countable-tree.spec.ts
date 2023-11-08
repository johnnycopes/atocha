import { CountableTree } from './countable-tree';
import {
  getId,
  getChildren,
  getTargetCount,
  AFRICA,
  ALL_SELECTED_IDS_ARRAY,
  SOME_SELECTED_IDS_SET,
} from './shared/mock-data';

describe('CountableTree', () => {
  describe('initializing', () => {
    it('returns total counts when passed empty model', () => {
      const tree = new CountableTree(
        AFRICA,
        getId,
        getChildren,
        getTargetCount
      );

      expect(tree.totalCounts).toEqual({
        Africa: 130,
        'Central Africa': 65,
        Fes: 11,
        Marrakesh: 9,
        Morocco: 20,
        Namibia: 17,
        'Northern Africa': 20,
        'Southern Africa': 45,
        Swaziland: 28,
      });
      expect(tree.selectedCounts).toEqual({
        Africa: 0,
        'Central Africa': 0,
        Fes: 0,
        Marrakesh: 0,
        Morocco: 0,
        Namibia: 0,
        'Northern Africa': 0,
        'Southern Africa': 0,
        Swaziland: 0,
      });
    });
  });

  describe('updating', () => {
    it('returns correct counts records after updating to partial model', () => {
      const tree = new CountableTree(
        AFRICA,
        getId,
        getChildren,
        getTargetCount
      );

      tree.updateCounts(SOME_SELECTED_IDS_SET);

      expect(tree.totalCounts).toEqual({
        Africa: 130,
        'Central Africa': 65,
        Fes: 11,
        Marrakesh: 9,
        Morocco: 20,
        Namibia: 17,
        'Northern Africa': 20,
        'Southern Africa': 45,
        Swaziland: 28,
      });
      expect(tree.selectedCounts).toEqual({
        Africa: 39,
        'Central Africa': 0,
        Fes: 11,
        Marrakesh: 0,
        Morocco: 11,
        Namibia: 0,
        'Northern Africa': 11,
        'Southern Africa': 28,
        Swaziland: 28,
      });
    });

    it('returns correct counts records after updating to full model', () => {
      const tree = new CountableTree(
        AFRICA,
        getId,
        getChildren,
        getTargetCount
      );

      tree.updateCounts(ALL_SELECTED_IDS_ARRAY);

      expect(tree.totalCounts).toEqual({
        Africa: 130,
        'Central Africa': 65,
        Fes: 11,
        Marrakesh: 9,
        Morocco: 20,
        Namibia: 17,
        'Northern Africa': 20,
        'Southern Africa': 45,
        Swaziland: 28,
      });
      expect(tree.selectedCounts).toEqual({
        Africa: 130,
        'Central Africa': 65,
        Fes: 11,
        Marrakesh: 9,
        Morocco: 20,
        Namibia: 17,
        'Northern Africa': 20,
        'Southern Africa': 45,
        Swaziland: 28,
      });
    });
  });
});
