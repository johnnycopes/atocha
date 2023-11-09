import { toStates } from './to-states';
import {
  ALL_SELECTED_IDS_ARRAY,
  ALL_SELECTED_STATES,
  SOME_SELECTED_IDS_ARRAY,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';
import { MOCK_TREE } from './ids/mock-ids';

describe('toStates', () => {
  describe('passing in an IDs array', () => {
    it('transforms empty IDs array', () => {
      expect(toStates([], MOCK_TREE)).toEqual({});
    });

    it('transforms partial IDs array', () => {
      expect(toStates(SOME_SELECTED_IDS_ARRAY, MOCK_TREE)).toEqual(
        SOME_SELECTED_STATES
      );
    });

    it('transforms full IDs array', () => {
      expect(toStates(ALL_SELECTED_IDS_ARRAY, MOCK_TREE)).toEqual(
        ALL_SELECTED_STATES
      );
    });
  });

  describe('passing in an IDs set', () => {
    it('transforms empty IDs set', () => {
      expect(toStates(new Set(), MOCK_TREE)).toEqual({});
    });

    it('transforms partial IDs set', () => {
      expect(toStates(SOME_SELECTED_IDS_ARRAY, MOCK_TREE)).toEqual(
        SOME_SELECTED_STATES
      );
    });

    it('transforms full IDs set', () => {
      expect(toStates(ALL_SELECTED_IDS_ARRAY, MOCK_TREE)).toEqual(
        ALL_SELECTED_STATES
      );
    });
  });
});
