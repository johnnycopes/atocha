import { ModelTransformer } from './model-transformer';
import {
  getChildren,
  getId,
  AFRICA,
  SOME_SELECTED_NEW,
  ALL_SELECTED_NEW,
  SOME_SELECTED,
  ALL_SELECTED,
  TestItem,
} from '../../../.storybook/mock-data/checkbox-tree';

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
      expect(transformer.toModel(SOME_SELECTED)).toEqual(SOME_SELECTED_NEW);
    });

    it('transforms full states', () => {
      expect(transformer.toModel(ALL_SELECTED)).toEqual(ALL_SELECTED_NEW);
    });
  });

  describe('toStates', () => {
    it('transforms empty model', () => {
      expect(transformer.toStates([])).toEqual({});
    });

    it('transforms partial model', () => {
      expect(transformer.toStates(SOME_SELECTED_NEW)).toEqual(SOME_SELECTED);
    });

    it('transforms full model', () => {
      expect(transformer.toStates(ALL_SELECTED_NEW)).toEqual(ALL_SELECTED);
    });
  });

  describe('updateStates', () => {
    let item: TestItem = AFRICA;

    beforeEach(() => {
      item = AFRICA;
    });

    it('selects all states when the top node is selected', () => {
      expect(transformer.updateStates(true, item, {})).toEqual({
        Africa: 'checked',
        'Central Africa': 'checked',
        Fes: 'checked',
        Marrakesh: 'checked',
        Morocco: 'checked',
        Namibia: 'checked',
        'Northern Africa': 'checked',
        'Southern Africa': 'checked',
        Swaziland: 'checked',
      });
    });

    it('deselects all states when the top node is deselected', () => {
      expect(transformer.updateStates(false, item, ALL_SELECTED)).toEqual({});
    });

    it('updates states when middle checkbox is selected', () => {
      item = AFRICA.children
        ?.find(({ id }) => id === 'Northern Africa')
        ?.children?.find(({ id }) => id === 'Morocco') ?? { id: 'Morocco' };

      expect(transformer.updateStates(true, item, {})).toEqual({
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

      expect(transformer.updateStates(true, item, {})).toEqual({
        Africa: 'indeterminate',
        Namibia: 'checked',
        'Southern Africa': 'indeterminate',
      });
    });

    it('updates indeterminate states to checked when selected', () => {
      item = AFRICA.children?.find(({ id }) => id === 'Southern Africa') ?? {
        id: 'Southern Africa',
      };

      expect(transformer.updateStates(true, item, SOME_SELECTED)).toEqual({
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
