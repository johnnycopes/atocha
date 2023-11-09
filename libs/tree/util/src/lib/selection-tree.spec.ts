import { SelectionTree } from './selection-tree';
import {
  getChildren,
  getId,
  AFRICA,
  ALL_SELECTED_IDS,
  SOME_SELECTED_IDS,
} from './shared/mock-data';

describe('SelectionTree', () => {
  describe('initializing', () => {
    it('returns correct data without any nodes selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      expect(tree.selectedIds).toEqual([]);
    });

    it('returns correct data with some node IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_IDS
      );

      expect(tree.selectedIds).toEqual(SOME_SELECTED_IDS);
    });

    it('returns correct data with all IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS
      );

      expect(tree.selectedIds).toEqual(ALL_SELECTED_IDS);
    });
  });

  describe('updating individual nodes', () => {
    it('selects all items when none are selected and the root item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Africa');

      expect(tree.selectedIds).toEqual(ALL_SELECTED_IDS);
    });

    it('deselects all items when all are selected and the root item is deselected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS
      );

      tree.updateOne('Africa');

      expect(tree.selectedIds).toEqual([]);
    });

    it('correctly affects tree when middle item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Morocco');

      expect(tree.selectedIds).toEqual(['Marrakesh', 'Fes']);
    });

    it('correctly affects tree when leaf item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Namibia');

      expect(tree.selectedIds).toEqual(['Namibia']);
    });

    it('converts indeterminate states to selected when toggled', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_IDS
      );

      tree
        .updateOne('Southern Africa')
        .updateOne('Southern Africa')
        .updateOne('Northern Africa');

      expect(tree.selectedIds).toEqual(['Marrakesh', 'Fes']);
    });

    it('reads individual node states correctly', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Namibia');

      expect(tree.getState('Southern Africa')).toBe('indeterminate');
      expect(tree.getState('Swaziland')).toBe(undefined);
      expect(tree.getState('Namibia')).toBe('checked');
    });
  });

  describe('passing in selected node IDs', () => {
    it('registers partial states', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateMultiple(SOME_SELECTED_IDS);

      expect(tree.selectedIds).toEqual(SOME_SELECTED_IDS);
    });

    it('registers multiple changes correctly', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS
      );

      tree
        .updateOne('Namibia')
        .updateMultiple([])
        .updateOne('Swaziland')
        .updateOne('Central Africa');

      expect(tree.selectedIds).toEqual(['Central Africa', 'Swaziland']);
    });

    it('reads individual node states correctly', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateMultiple(SOME_SELECTED_IDS);

      expect(tree.getState('Southern Africa')).toBe('indeterminate');
      expect(tree.getState('Swaziland')).toBe('checked');
      expect(tree.getState('Namibia')).toBe(undefined);
    });
  });
});
