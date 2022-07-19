import { areEqualShallow } from './are-equal-shallow';

describe('areEqualShallow', () => {
  it('returns true with two empty objects', () => {
    expect(areEqualShallow({}, {})).toBe(true);
  });

  it('returns true when objects have the same values', () => {
    const first = { route: '/cart', loading: false };
    const second = { ...first };
    expect(areEqualShallow(first, second)).toBe(true);
  });

  it('returns false when objects have different values', () => {
    const first = { route: '/cart', loading: false };
    const second = { ...first, loading: true };
    expect(areEqualShallow(first, second)).toBe(false);
  });
});
