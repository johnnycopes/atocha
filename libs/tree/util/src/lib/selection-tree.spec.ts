import { SelectionTree } from './selection-tree';
import {
  getChildren,
  getId,
  AFRICA,
  ALL_SELECTED_STATES,
  ALL_SELECTED_IDS_ARRAY,
  ALL_SELECTED_IDS_SET,
  SOME_SELECTED_STATES,
  SOME_SELECTED_IDS_ARRAY,
  SOME_SELECTED_IDS_SET,
} from './shared/mock-data';

describe('SelectionTree', () => {
  describe('initializing', () => {
    it('returns correct data without any nodes selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      expect(tree.root).toEqual(AFRICA);
      expect(tree.array).toEqual([]);
      expect(tree.set).toEqual(new Set());
      expect(tree.states).toEqual({});
    });

    it('returns correct data with some node IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_IDS_ARRAY
      );

      expect(tree.root).toEqual(AFRICA);
      expect(tree.array).toEqual(SOME_SELECTED_IDS_ARRAY);
      expect(tree.set).toEqual(SOME_SELECTED_IDS_SET);
      expect(tree.states).toEqual(SOME_SELECTED_STATES);
    });

    it('returns correct data with all IDs selected', () => {
      const tree = new SelectionTree(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_IDS_ARRAY
      );

      expect(tree.root).toEqual(AFRICA);
      expect(tree.array).toEqual(ALL_SELECTED_IDS_ARRAY);
      expect(tree.set).toEqual(ALL_SELECTED_IDS_SET);
      expect(tree.states).toEqual(ALL_SELECTED_STATES);
    });
  });

  describe('updating individual items', () => {
    it('selects all items when none are selected and the root item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Africa');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.array).toEqual(ALL_SELECTED_IDS_ARRAY);
      expect(tree.set).toEqual(ALL_SELECTED_IDS_SET);
      expect(tree.states).toEqual(ALL_SELECTED_STATES);
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
      expect(tree.array).toEqual([]);
      expect(tree.set).toEqual(new Set());
      expect(tree.states).toEqual({});
    });

    it('correctly affects tree when middle item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Morocco');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.array).toEqual(['Marrakesh', 'Fes']);
      expect(tree.set).toEqual(new Set(['Marrakesh', 'Fes']));
      expect(tree.states).toEqual({
        Africa: 'indeterminate',
        Fes: 'checked',
        Marrakesh: 'checked',
        Morocco: 'checked',
        'Northern Africa': 'checked',
      });
    });

    it('correctly affects tree when leaf item is selected', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateOne('Namibia');

      expect(tree.root).toEqual(AFRICA);
      expect(tree.array).toEqual(['Namibia']);
      expect(tree.set).toEqual(new Set(['Namibia']));
      expect(tree.states).toEqual({
        Africa: 'indeterminate',
        Namibia: 'checked',
        'Southern Africa': 'indeterminate',
      });
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
      expect(tree.array).toEqual(['Marrakesh', 'Fes']);
      expect(tree.set).toEqual(new Set(['Marrakesh', 'Fes']));
      expect(tree.states).toEqual({
        Africa: 'indeterminate',
        'Northern Africa': 'checked',
        Morocco: 'checked',
        Marrakesh: 'checked',
        Fes: 'checked',
      });
    });
  });

  describe('updating', () => {
    it('registers partial states', () => {
      const tree = new SelectionTree(AFRICA, getId, getChildren);

      tree.updateMultiple(SOME_SELECTED_IDS_ARRAY);

      expect(tree.root).toEqual(AFRICA);
      expect(tree.array).toEqual(SOME_SELECTED_IDS_ARRAY);
      expect(tree.set).toEqual(SOME_SELECTED_IDS_SET);
      expect(tree.states).toEqual(SOME_SELECTED_STATES);
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
      expect(tree.array).toEqual(['Central Africa', 'Swaziland']);
      expect(tree.set).toEqual(new Set(['Central Africa', 'Swaziland']));
      expect(tree.states).toEqual({
        Africa: 'indeterminate',
        'Central Africa': 'checked',
        'Southern Africa': 'indeterminate',
        Swaziland: 'checked',
      });
    });
  });
});
