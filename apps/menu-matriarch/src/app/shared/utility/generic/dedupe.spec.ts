import { dedupe } from "./dedupe";

describe('dedupe', () => {
  it('does not affect empty arrays', () => {
    expect(dedupe([])).toEqual([]);
  });

  it('maintains existing array structure when no duplicates present', () => {
    expect(dedupe([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('rids array of duplicate values', () => {
    expect(dedupe([1, 1, 2, 3])).toEqual([1, 2, 3]);
  });
});
