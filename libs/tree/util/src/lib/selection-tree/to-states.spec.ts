import { toStates } from './to-states';
import {
  ALL_SELECTED_IDS,
  ALL_SELECTED_STATES,
  SOME_SELECTED_IDS,
  SOME_SELECTED_STATES,
} from '../shared/mock-data';
import { MOCK_TREE } from './ids/mock-ids';

describe('toStates', () => {
  it('transforms empty IDs array', () => {
    expect(toStates([], MOCK_TREE)).toStrictEqual({});
  });

  it('transforms partial IDs array', () => {
    expect(toStates(SOME_SELECTED_IDS, MOCK_TREE)).toStrictEqual(
      SOME_SELECTED_STATES
    );
  });

  it('transforms full IDs array', () => {
    expect(toStates(ALL_SELECTED_IDS, MOCK_TREE)).toStrictEqual(
      ALL_SELECTED_STATES
    );
  });
});
