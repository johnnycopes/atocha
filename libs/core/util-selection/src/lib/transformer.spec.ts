import { Transformer } from './transformer';
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

describe('Transformer', () => {
  describe('initializing', () => {
    it('registers empty states', () => {
      const transformer = new Transformer(AFRICA, getId, getChildren);

      expect(transformer.array).toEqual([]);
      expect(transformer.set).toEqual<Set<string>>(new Set());
      expect(transformer.states).toEqual({});
    });

    it('registers partial states', () => {
      const transformer = new Transformer(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_ARRAY_MODEL
      );

      expect(transformer.array).toEqual(SOME_SELECTED_ARRAY_MODEL);
      expect(transformer.set).toEqual(SOME_SELECTED_SET_MODEL);
      expect(transformer.states).toEqual(SOME_SELECTED_STATES);
    });

    it('registers all states', () => {
      const transformer = new Transformer(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_ARRAY_MODEL
      );

      expect(transformer.array).toEqual(ALL_SELECTED_ARRAY_MODEL);
      expect(transformer.set).toEqual<Set<string>>(ALL_SELECTED_SET_MODEL);
      expect(transformer.states).toEqual(ALL_SELECTED_STATES);
    });
  });

  describe('updating individual items', () => {
    it('selects all items when none are selected and the root item is selected', () => {
      const transformer = new Transformer(AFRICA, getId, getChildren);

      transformer.updateOne('Africa');

      expect(transformer.array).toEqual(ALL_SELECTED_ARRAY_MODEL);
      expect(transformer.set).toEqual<Set<string>>(ALL_SELECTED_SET_MODEL);
      expect(transformer.states).toEqual(ALL_SELECTED_STATES);
    });

    it('deselects all items when all are selected and the root item is deselected', () => {
      const transformer = new Transformer(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_ARRAY_MODEL
      );

      transformer.updateOne('Africa');

      expect(transformer.array).toEqual([]);
      expect(transformer.set).toEqual<Set<string>>(new Set());
      expect(transformer.states).toEqual({});
    });

    it('correctly affects tree when middle item is selected', () => {
      const transformer = new Transformer(AFRICA, getId, getChildren);

      transformer.updateOne('Morocco');

      expect(transformer.array).toEqual(['Marrakesh', 'Fes']);
      expect(transformer.set).toEqual(new Set(['Marrakesh', 'Fes']));
      expect(transformer.states).toEqual({
        Africa: 'indeterminate',
        Fes: 'checked',
        Marrakesh: 'checked',
        Morocco: 'checked',
        'Northern Africa': 'checked',
      });
    });

    it('correctly affects tree when leaf item is selected', () => {
      const transformer = new Transformer(AFRICA, getId, getChildren);

      transformer.updateOne('Namibia');

      expect(transformer.array).toEqual(['Namibia']);
      expect(transformer.set).toEqual<Set<string>>(new Set(['Namibia']));
      expect(transformer.states).toEqual({
        Africa: 'indeterminate',
        Namibia: 'checked',
        'Southern Africa': 'indeterminate',
      });
    });

    it('converts indeterminate states to selected when toggled', () => {
      const transformer = new Transformer(
        AFRICA,
        getId,
        getChildren,
        SOME_SELECTED_ARRAY_MODEL
      );

      transformer
        .updateOne('Southern Africa')
        .updateOne('Southern Africa')
        .updateOne('Northern Africa');

      expect(transformer.array).toEqual(['Marrakesh', 'Fes']);
      expect(transformer.set).toEqual(new Set(['Marrakesh', 'Fes']));
      expect(transformer.states).toEqual({
        Africa: 'indeterminate',
        'Northern Africa': 'checked',
        Morocco: 'checked',
        Marrakesh: 'checked',
        Fes: 'checked',
      });
    });
  });

  describe('updating the model', () => {
    it('registers partial states', () => {
      const transformer = new Transformer(AFRICA, getId, getChildren);

      transformer.updateMultiple(SOME_SELECTED_ARRAY_MODEL);

      expect(transformer.array).toEqual(SOME_SELECTED_ARRAY_MODEL);
      expect(transformer.set).toEqual(SOME_SELECTED_SET_MODEL);
      expect(transformer.states).toEqual(SOME_SELECTED_STATES);
    });

    it('registers multiple changes correctly', () => {
      const transformer = new Transformer(
        AFRICA,
        getId,
        getChildren,
        ALL_SELECTED_ARRAY_MODEL
      );

      transformer
        .updateOne('Namibia')
        .updateMultiple([])
        .updateOne('Swaziland')
        .updateOne('Central Africa');

      expect(transformer.array).toEqual(['Central Africa', 'Swaziland']);
      expect(transformer.set).toEqual(new Set(['Central Africa', 'Swaziland']));
      expect(transformer.states).toEqual({
        Africa: 'indeterminate',
        'Central Africa': 'checked',
        'Southern Africa': 'indeterminate',
        Swaziland: 'checked',
      });
    });
  });
});
