import { toArray } from './to-array';
import {
  ALL_SELECTED_IDS_ARRAY,
  ALL_SELECTED_STATES,
  SOME_SELECTED_IDS_ARRAY,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';
import { MOCK_TREE } from './ids/mock-ids';

describe('toArray', () => {
  it('transforms empty states', () => {
    expect(toArray({}, MOCK_TREE)).toEqual([]);
  });

  it('transforms partial states', () => {
    expect(toArray(SOME_SELECTED_STATES, MOCK_TREE)).toEqual(
      SOME_SELECTED_IDS_ARRAY
    );
  });

  it('transforms full states', () => {
    expect(toArray(ALL_SELECTED_STATES, MOCK_TREE)).toEqual(
      ALL_SELECTED_IDS_ARRAY
    );
  });
});
