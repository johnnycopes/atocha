import { toArray } from './to-array';
import {
  ALL_SELECTED_ARRAY_MODEL,
  ALL_SELECTED_STATES,
  SOME_SELECTED_ARRAY_MODEL,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';
import { MOCK_IDS } from './ids/mock-ids';

describe('toArray', () => {
  it('transforms empty states', () => {
    expect(toArray({}, MOCK_IDS)).toEqual([]);
  });

  it('transforms partial states', () => {
    expect(toArray(SOME_SELECTED_STATES, MOCK_IDS)).toEqual(
      SOME_SELECTED_ARRAY_MODEL
    );
  });

  it('transforms full states', () => {
    expect(toArray(ALL_SELECTED_STATES, MOCK_IDS)).toEqual(
      ALL_SELECTED_ARRAY_MODEL
    );
  });
});