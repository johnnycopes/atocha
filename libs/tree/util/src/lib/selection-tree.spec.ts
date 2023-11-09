import { SelectionTree } from './selection-tree';
import {
  getChildren,
  getId,
  AFRICA,
  ALL_SELECTED_IDS_ARRAY,
  SOME_SELECTED_IDS_ARRAY,
} from './shared/mock-data';

describe('SelectionTree', () => {
  describe('initializing', () => {
    it('returns correct data without any nodes selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual([]);
    });

    it('returns correct data with some node IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_IDS_ARRAY
      );

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(SOME_SELECTED_IDS_ARRAY);
    });

    it('returns correct data with all IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS_ARRAY
      );

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(ALL_SELECTED_IDS_ARRAY);
    });
  });

  describe('updating individual items', () => {
    it('selects all items when none are selected and the root item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Africa');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(ALL_SELECTED_IDS_ARRAY);
    });

    it('deselects all items when all are selected and the root item is deselected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS_ARRAY
      );

      tree.updateOne('Africa');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual([]);
    });

    it('correctly affects tree when middle item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Morocco');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(['Marrakesh', 'Fes']);
    });

    it('correctly affects tree when leaf item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Namibia');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(['Namibia']);
    });

    it('converts indeterminate states to selected when toggled', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_IDS_ARRAY
      );

      tree
        .updateOne('Southern Africa')
        .updateOne('Southern Africa')
        .updateOne('Northern Africa');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(['Marrakesh', 'Fes']);
    });
  });

  describe('updating', () => {
    it('registers partial states', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateMultiple(SOME_SELECTED_IDS_ARRAY);

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(SOME_SELECTED_IDS_ARRAY);
    });

    it('registers multiple changes correctly', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS_ARRAY
      );

      tree
        .updateOne('Namibia')
        .updateMultiple([])
        .updateOne('Swaziland')
        .updateOne('Central Africa');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.idsArray).toEqual(['Central Africa', 'Swaziland']);
    });
  });
});
