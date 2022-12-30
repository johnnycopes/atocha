import { ModelTransformer } from './model-transformer';
import {
  getChildren,
  getId,
  AFRICA,
  SOME_SELECTED_NEW,
  ALL_SELECTED_NEW,
  SOME_SELECTED,
  ALL_SELECTED,
} from '../../../.storybook/mock-data/checkbox-tree';

describe('ModelTransformer', () => {
  let transformer = new ModelTransformer(AFRICA, getId, getChildren);

  beforeEach(() => {
    transformer = new ModelTransformer(AFRICA, getId, getChildren);
  });

  describe('toArr', () => {
    it('transforms empty obj model', () => {
      expect(transformer.toArr({})).toEqual([]);
    });

    it('transforms partial obj model', () => {
      expect(transformer.toArr(SOME_SELECTED)).toEqual(SOME_SELECTED_NEW);
    });

    it('transforms full obj model', () => {
      expect(transformer.toArr(ALL_SELECTED)).toEqual(ALL_SELECTED_NEW);
    });
  });

  describe('toObj', () => {
    it('transforms empty array model', () => {
      expect(transformer.toObj([])).toEqual({});
    });

    it('transforms partial array model', () => {
      expect(transformer.toObj(SOME_SELECTED_NEW)).toEqual(SOME_SELECTED);
    });

    it('transforms full array model', () => {
      expect(transformer.toObj(ALL_SELECTED_NEW)).toEqual(ALL_SELECTED);
    });
  });

  describe('updateObj', () => {
    it('exists', () => {
      expect(transformer.updateObj).toBeTruthy();
    });
  });
});
