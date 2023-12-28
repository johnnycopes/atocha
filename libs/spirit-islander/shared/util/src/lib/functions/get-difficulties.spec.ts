import { getDifficulties } from './get-difficulties';

describe('getDifficulties', () => {
  it('returns all game expansions', () => {
    expect(getDifficulties()).toStrictEqual([
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
  });
});
