import { uniqueDiff } from './unique-diff';

describe('uniqueDiff', () => {
  it('returns empty values when initial and final are empty', () => {
    expect(uniqueDiff([], [])).toEqual({ added: [], removed: [] });
  });

  it('returns empty values when initial and final are equal', () => {
    expect(uniqueDiff([1, 2, 3], [1, 2, 3])).toEqual({ added: [], removed: [] });
  });

  it('returns removed values when initial has unique values', () => {
    expect(uniqueDiff([1, 2, 3], [1, 2])).toEqual({ added: [], removed: [3] });
  });

  it('returns added values when final has unique values', () => {
    expect(uniqueDiff([1, 2], [1, 2, 3])).toEqual({ added: [3], removed: [] });
  });

  it('returns empty values despite duplicates', () => {
    expect(uniqueDiff([1, 1, 3, 2, 2], [3, 3, 2, 1, 1])).toEqual({ added: [], removed: [] });
  });

  it('returns correct values despite duplicates', () => {
    expect(uniqueDiff([1, 1, 1, 2], [3, 3, 3, 4])).toEqual({ added: [3, 4], removed: [1, 2] });
  });
});
