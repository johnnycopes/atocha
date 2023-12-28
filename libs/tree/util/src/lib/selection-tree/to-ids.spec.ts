import { toIds } from './to-ids';
import {
  ALL_SELECTED_IDS,
  ALL_SELECTED_STATES,
  SOME_SELECTED_IDS,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';
import { MOCK_TREE } from './ids/mock-ids';

describe('toIds', () => {
  it('transforms empty states', () => {
    expect(toIds({}, MOCK_TREE)).toStrictEqual([]);
  });

  it('transforms partial states', () => {
    expect(toIds(SOME_SELECTED_STATES, MOCK_TREE)).toStrictEqual(
      SOME_SELECTED_IDS
    );
  });

  it('transforms full states', () => {
    expect(toIds(ALL_SELECTED_STATES, MOCK_TREE)).toStrictEqual(
      ALL_SELECTED_IDS
    );
  });
});
