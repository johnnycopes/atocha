import { calculateTallyChange } from "./calculate-tally-change";

describe('calculateTallyChange', () => {
  let tally: Record<string, number>;

  beforeEach(() => {
    tally = {
      fruits: 3,
      vegetables: 1,
      produce: 0,
    };
  });

  it('throws an error on decrement or clear when value does not exist in tally', () => {
    expect(() => calculateTallyChange({
      tally,
      key: 'fake',
      change: 'decrement',
    })).toThrowError('Cannot decrement or clear value: key is not present in tally');

    expect(() => calculateTallyChange({
      tally,
      key: 'fake',
      change: 'clear',
    })).toThrowError('Cannot decrement or clear value: key is not present in tally');
  });

  it('returns 1 on increment when value does not exist in tally', () => {
    expect(calculateTallyChange({
      tally,
      key: 'fake',
      change: 'increment',
    })).toBe(1);
  });

  it('returns 1 on increment when value is 0', () => {
    expect(calculateTallyChange({
      tally,
      key: 'produce',
      change: 'increment',
    })).toBe(1);
  });

  it('returns 0 on increment when value is greater than 0', () => {
    expect(calculateTallyChange({
      tally,
      key: 'vegetables',
      change: 'increment',
    })).toBe(0);
  });

  it('returns 0 on decrement when value is greater than 1', () => {
    expect(calculateTallyChange({
      tally,
      key: 'fruits',
      change: 'decrement',
    })).toBe(0);
  });

  it('returns -1 on decrement when value is 1', () => {
    expect(calculateTallyChange({
      tally,
      key: 'vegetables',
      change: 'decrement',
    })).toBe(-1);
  });

  it('returns -1 on clear, regardless of value', () => {
    expect(calculateTallyChange({
      tally,
      key: 'fruits',
      change: 'clear',
    })).toBe(-1);

    expect(calculateTallyChange({
      tally,
      key: 'produce',
      change: 'clear',
    })).toBe(-1);
  });
});
