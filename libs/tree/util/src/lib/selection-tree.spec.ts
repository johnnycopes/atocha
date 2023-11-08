import { SelectionTree } from './selection-tree';
import {
  getChildren,
  getId,
  AFRICA,
  ALL_SELECTED_IDS_ARRAY,
  ALL_SELECTED_IDS_SET,
  SOME_SELECTED_IDS_ARRAY,
  SOME_SELECTED_IDS_SET,
} from './shared/mock-data';

describe('SelectionTree', () => {
  describe('initializing', () => {
    it('returns correct data without any nodes selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      expect(tree.root).toEqual(AFRICA);
      expect(tree.getIdsArray()).toEqual([]);
      expect(tree.getIdsSet()).toEqual(new Set());
    });

    it('returns correct data with some node IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_IDS_ARRAY
      );

      expect(tree.root).toEqual(AFRICA);
      expect(tree.getIdsArray()).toEqual(SOME_SELECTED_IDS_ARRAY);
      expect(tree.getIdsSet()).toEqual(SOME_SELECTED_IDS_SET);
    });

    it('returns correct data with all IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS_ARRAY
      );

      expect(tree.root).toEqual(AFRICA);
      expect(tree.getIdsArray()).toEqual(ALL_SELECTED_IDS_ARRAY);
      expect(tree.getIdsSet()).toEqual(ALL_SELECTED_IDS_SET);
    });
  });

  describe('updating individual items', () => {
    it('selects all items when none are selected and the root item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Africa');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.getIdsArray()).toEqual(ALL_SELECTED_IDS_ARRAY);
      expect(tree.getIdsSet()).toEqual(ALL_SELECTED_IDS_SET);
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
      expect(tree.getIdsArray()).toEqual([]);
      expect(tree.getIdsSet()).toEqual(new Set());
    });

    it('correctly affects tree when middle item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Morocco');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.getIdsArray()).toEqual(['Marrakesh', 'Fes']);
      expect(tree.getIdsSet()).toEqual(new Set(['Marrakesh', 'Fes']));
    });

    it('correctly affects tree when leaf item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Namibia');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.getIdsArray()).toEqual(['Namibia']);
      expect(tree.getIdsSet()).toEqual(new Set(['Namibia']));
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
      expect(tree.getIdsArray()).toEqual(['Marrakesh', 'Fes']);
      expect(tree.getIdsSet()).toEqual(new Set(['Marrakesh', 'Fes']));
    });
  });

  describe('updating', () => {
    it('registers partial states', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateMultiple(SOME_SELECTED_IDS_ARRAY);

      expect(tree.root).toEqual(AFRICA);
      expect(tree.getIdsArray()).toEqual(SOME_SELECTED_IDS_ARRAY);
      expect(tree.getIdsSet()).toEqual(SOME_SELECTED_IDS_SET);
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
      expect(tree.getIdsArray()).toEqual(['Central Africa', 'Swaziland']);
      expect(tree.getIdsSet()).toEqual(
        new Set(['Central Africa', 'Swaziland'])
      );
    });
  });
});
