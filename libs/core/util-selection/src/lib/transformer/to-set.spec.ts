import { toSet } from './to-set';
import {
  ALL_SELECTED_SET_MODEL,
  ALL_SELECTED_STATES,
  MOCK_IDS,
  SOME_SELECTED_SET_MODEL,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';

describe('toSet', () => {
  it('transforms empty states', () => {
    expect(toSet({}, MOCK_IDS)).toEqual(new Set<string>());
  });

  it('transforms partial states', () => {
    expect(toSet(SOME_SELECTED_STATES, MOCK_IDS)).toEqual(
      SOME_SELECTED_SET_MODEL
    );
  });

  it('transforms full states', () => {
    expect(toSet(ALL_SELECTED_STATES, MOCK_IDS)).toEqual(
      ALL_SELECTED_SET_MODEL
    );
  });
});
