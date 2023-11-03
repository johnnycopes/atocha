import { toStates } from './to-states';
import {
  ALL_SELECTED_ARRAY_MODEL,
  ALL_SELECTED_SET_MODEL,
  ALL_SELECTED_STATES,
  MOCK_IDS,
  SOME_SELECTED_ARRAY_MODEL,
  SOME_SELECTED_SET_MODEL,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';

describe('toStates', () => {
  describe('passing in an array model', () => {
    it('transforms empty model', () => {
      expect(toStates([], MOCK_IDS)).toEqual({});
    });

    it('transforms partial model', () => {
      expect(toStates(SOME_SELECTED_ARRAY_MODEL, MOCK_IDS)).toEqual(
        SOME_SELECTED_STATES
      );
    });

    it('transforms full model', () => {
      expect(toStates(ALL_SELECTED_ARRAY_MODEL, MOCK_IDS)).toEqual(
        ALL_SELECTED_STATES
      );
    });
  });

  describe('passing in a set model', () => {
    it('transforms empty model', () => {
      expect(toStates(new Set(), MOCK_IDS)).toEqual({});
    });

    it('transforms partial model', () => {
      expect(toStates(SOME_SELECTED_SET_MODEL, MOCK_IDS)).toEqual(
        SOME_SELECTED_STATES
      );
    });

    it('transforms full model', () => {
      expect(toStates(ALL_SELECTED_SET_MODEL, MOCK_IDS)).toEqual(
        ALL_SELECTED_STATES
      );
    });
  });
});
