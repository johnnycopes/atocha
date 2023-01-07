import { ModelTransformer } from './model-transformer';
import {
  getChildren,
  getId,
  AFRICA,
  ALL_SELECTED_MODEL,
  ALL_SELECTED_STATES,
  SOME_SELECTED_STATES,
  SOME_SELECTED_MODEL,
  TestItem,
} from './mock-data';

describe('ModelTransformer', () => {
  let transformer = new ModelTransformer(AFRICA, getId, getChildren);

  beforeEach(() => {
    transformer = new ModelTransformer(AFRICA, getId, getChildren);
  });

  describe('toModel', () => {
    it('transforms empty states', () => {
      expect(transformer.toModel({})).toEqual([]);
    });

    it('transforms partial states', () => {
      expect(transformer.toModel(SOME_SELECTED_STATES)).toEqual(
        SOME_SELECTED_MODEL
      );
    });

    it('transforms full states', () => {
      expect(transformer.toModel(ALL_SELECTED_STATES)).toEqual(
        ALL_SELECTED_MODEL
      );
    });
  });

  describe('toStates', () => {
    it('transforms empty model', () => {
      expect(transformer.toStates([])).toEqual({});
    });

    it('transforms partial model', () => {
      expect(transformer.toStates(SOME_SELECTED_MODEL)).toEqual(
        SOME_SELECTED_STATES
      );
    });

    it('transforms full model', () => {
      expect(transformer.toStates(ALL_SELECTED_MODEL)).toEqual(
        ALL_SELECTED_STATES
      );
    });
  });

  describe('updateStates', () => {
    let item: TestItem = AFRICA;

    beforeEach(() => {
      item = AFRICA;
    });

    it('selects all states when the top node is selected', () => {
      expect(transformer.updateStates(true, item.id, {})).toEqual(
        ALL_SELECTED_STATES
      );
    });

    it('deselects all states when the top node is deselected', () => {
      expect(
        transformer.updateStates(false, item.id, ALL_SELECTED_STATES)
      ).toEqual({});
    });

    it('updates states when middle checkbox is selected', () => {
      item = AFRICA.children
        ?.find(({ id }) => id === 'Northern Africa')
        ?.children?.find(({ id }) => id === 'Morocco') ?? { id: 'Morocco' };

      expect(transformer.updateStates(true, item.id, {})).toEqual({
        Africa: 'indeterminate',
        Fes: 'checked',
        Marrakesh: 'checked',
        Morocco: 'checked',
        'Northern Africa': 'checked',
      });
    });

    it('updates states when leaf checkbox is selected', () => {
      item = AFRICA.children
        ?.find(({ id }) => id === 'Southern Africa')
        ?.children?.find(({ id }) => id === 'Namibia') ?? { id: 'Namibia' };

      expect(transformer.updateStates(true, item.id, {})).toEqual({
        Africa: 'indeterminate',
        Namibia: 'checked',
        'Southern Africa': 'indeterminate',
      });
    });

    it('updates indeterminate states to checked when selected', () => {
      item = AFRICA.children?.find(({ id }) => id === 'Southern Africa') ?? {
        id: 'Southern Africa',
      };

      expect(
        transformer.updateStates(true, item.id, SOME_SELECTED_STATES)
      ).toEqual({
        Africa: 'indeterminate',
        Fes: 'checked',
        Morocco: 'indeterminate',
        Namibia: 'checked',
        'Northern Africa': 'indeterminate',
        'Southern Africa': 'checked',
        Swaziland: 'checked',
      });
    });
  });
});
