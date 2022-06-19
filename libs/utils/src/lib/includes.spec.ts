import { includes } from "./includes";

describe('includes', () => {
  it('returns false if collection is empty, regardless of value', () => {
    expect(includes([], '')).toBe(false);
    expect(includes([], 'a')).toBe(false);
    expect(includes([], [])).toBe(false);
    expect(includes([], ['a'])).toBe(false);
  });

  it('returns true if value is an empty string', () => {
    expect(includes(['Pizza'], '')).toBe(true);
  });

  it('returns false if value is an empty array', () => {
    expect(includes(['Pizza'], [])).toBe(false);
  });

  it('returns false if no item in collection matches value', () => {
    expect(includes(['Pizza', 'Sandwich'], 'x')).toBe(false);
    expect(includes(['Pizza', 'Sandwich'], ['x', 'y'])).toBe(false);
  });

  it('returns true if any item in collection matches string value', () => {
    expect(includes(['Pizza', 'Sandwich'], 'p')).toBe(true);
    expect(includes(['Pizza', 'Sandwich'], ['p', 'x'])).toBe(true);
  });
});
