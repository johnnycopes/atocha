import { toSet } from './to-set';
import {
  ALL_SELECTED_IDS_SET,
  ALL_SELECTED_STATES,
  SOME_SELECTED_IDS_SET,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';
import { MOCK_TREE } from './ids/mock-ids';

describe('toSet', () => {
  it('transforms empty states', () => {
    expect(toSet({}, MOCK_TREE)).toEqual(new Set<string>());
  });

  it('transforms partial states', () => {
    expect(toSet(SOME_SELECTED_STATES, MOCK_TREE)).toEqual(
      SOME_SELECTED_IDS_SET
    );
  });

  it('transforms full states', () => {
    expect(toSet(ALL_SELECTED_STATES, MOCK_TREE)).toEqual(ALL_SELECTED_IDS_SET);
  });
});
