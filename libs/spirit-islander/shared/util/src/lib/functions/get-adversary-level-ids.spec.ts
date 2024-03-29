import { getAdversaries } from './get-adversaries';
import { getAdversaryLevelIds } from './get-adversary-level-ids';

describe('getAdversaryLevelIds', () => {
  const adversaries = getAdversaries().slice(1, 3);
  it('returns the unique IDs from a collection of adversaries', () => {
    expect(getAdversaryLevelIds(adversaries)).toStrictEqual([
      'bp-0',
      'bp-1',
      'bp-2',
      'bp-3',
      'bp-4',
      'bp-5',
      'bp-6',
      'en-0',
      'en-1',
      'en-2',
      'en-3',
      'en-4',
      'en-5',
      'en-6',
    ]);
  });
});
