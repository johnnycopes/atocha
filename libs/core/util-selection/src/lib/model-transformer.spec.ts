import { ModelTransformer } from './model-transformer';
import {
  getChildren,
  getId,
  AFRICA,
  ALL_SELECTED_STATES,
  ALL_SELECTED_ARRAY_MODEL,
  ALL_SELECTED_SET_MODEL,
  SOME_SELECTED_STATES,
  SOME_SELECTED_ARRAY_MODEL,
  SOME_SELECTED_SET_MODEL,
} from './internal/mock-data';

describe('ModelTransformer', () => {
  describe('initializing states', () => {
    it('registers empty states', () => {
      const transformer = new ModelTransformer(AFRICA, getId, getChildren);

      expect(transformer.toArray()).toEqual([]);
      expect(transformer.toSet()).toEqual<Set<string>>(new Set());
      expect(transformer.toStates()).toEqual({});
    });

    it('registers partial states', () => {
      const transformer = new ModelTransformer(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_ARRAY_MODEL
      );

      expect(transformer.toArray()).toEqual(SOME_SELECTED_ARRAY_MODEL);
      expect(transformer.toSet()).toEqual(SOME_SELECTED_SET_MODEL);
      expect(transformer.toStates()).toEqual(SOME_SELECTED_STATES);
    });

    it('registers all states', () => {
      const transformer = new ModelTransformer(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_ARRAY_MODEL
      );

      expect(transformer.toArray()).toEqual(ALL_SELECTED_ARRAY_MODEL);
      expect(transformer.toSet()).toEqual<Set<string>>(ALL_SELECTED_SET_MODEL);
      expect(transformer.toStates()).toEqual(ALL_SELECTED_STATES);
    });
  });

  describe('updating states', () => {
    it('selects all items when none are selected and the root item is selected', () => {
      const transformer = new ModelTransformer(AFRICA, getId, getChildren);

      transformer.updateStates(true, 'Africa');

      expect(transformer.toArray()).toEqual(ALL_SELECTED_ARRAY_MODEL);
      expect(transformer.toSet()).toEqual<Set<string>>(ALL_SELECTED_SET_MODEL);
      expect(transformer.toStates()).toEqual(ALL_SELECTED_STATES);
    });

    it('deselects all items when all are selected and the root item is deselected', () => {
      const transformer = new ModelTransformer(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_ARRAY_MODEL
      );

      transformer.updateStates(false, 'Africa');

      expect(transformer.toArray()).toEqual([]);
      expect(transformer.toSet()).toEqual<Set<string>>(new Set());
      expect(transformer.toStates()).toEqual({});
    });

    it('correctly affects tree when middle item is selected', () => {
      const transformer = new ModelTransformer(AFRICA, getId, getChildren);

      transformer.updateStates(true, 'Morocco');

      expect(transformer.toArray()).toEqual(['Marrakesh', 'Fes']);
      expect(transformer.toSet()).toEqual(new Set(['Marrakesh', 'Fes']));
      expect(transformer.toStates()).toEqual({
        Africa: 'indeterminate',
        Fes: 'checked',
        Marrakesh: 'checked',
        Morocco: 'checked',
        'Northern Africa': 'checked',
      });
    });

    it('correctly affects tree when leaf item is selected', () => {
      const transformer = new ModelTransformer(AFRICA, getId, getChildren);

      transformer.updateStates(true, 'Namibia');

      expect(transformer.toArray()).toEqual(['Namibia']);
      expect(transformer.toSet()).toEqual<Set<string>>(new Set(['Namibia']));
      expect(transformer.toStates()).toEqual({
        Africa: 'indeterminate',
        Namibia: 'checked',
        'Southern Africa': 'indeterminate',
      });
    });

    it('converts indeterminate states to selected when toggled', () => {
      const transformer = new ModelTransformer(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_ARRAY_MODEL
      );

      transformer
        .updateStates(true, 'Southern Africa')
        .updateStates(false, 'Southern Africa')
        .updateStates(true, 'Northern Africa');

      expect(transformer.toArray()).toEqual(['Marrakesh', 'Fes']);
      expect(transformer.toSet()).toEqual(new Set(['Marrakesh', 'Fes']));
      expect(transformer.toStates()).toEqual({
        Africa: 'indeterminate',
        'Northern Africa': 'checked',
        Morocco: 'checked',
        Marrakesh: 'checked',
        Fes: 'checked',
      });
    });
  });
});
