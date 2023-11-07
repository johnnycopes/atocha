import { toStates } from './to-states';
import {
  ALL_SELECTED_IDS_ARRAY,
  ALL_SELECTED_IDS_SET,
  ALL_SELECTED_STATES,
  SOME_SELECTED_IDS_ARRAY,
  SOME_SELECTED_IDS_SET,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';
import { MOCK_TREE } from './ids/mock-ids';

describe('toStates', () => {
  describe('passing in an array model', () => {
    it('transforms empty model', () => {
      expect(toStates([], MOCK_TREE)).toEqual({});
    });

    it('transforms partial model', () => {
      expect(toStates(SOME_SELECTED_IDS_ARRAY, MOCK_TREE)).toEqual(
        SOME_SELECTED_STATES
      );
    });

    it('transforms full model', () => {
      expect(toStates(ALL_SELECTED_IDS_ARRAY, MOCK_TREE)).toEqual(
        ALL_SELECTED_STATES
      );
    });
  });

  describe('passing in a set model', () => {
    it('transforms empty model', () => {
      expect(toStates(new Set(), MOCK_TREE)).toEqual({});
    });

    it('transforms partial model', () => {
      expect(toStates(SOME_SELECTED_IDS_SET, MOCK_TREE)).toEqual(
        SOME_SELECTED_STATES
      );
    });

    it('transforms full model', () => {
      expect(toStates(ALL_SELECTED_IDS_SET, MOCK_TREE)).toEqual(
        ALL_SELECTED_STATES
      );
    });
  });
});
