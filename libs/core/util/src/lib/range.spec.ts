import { range } from './range';

describe('range', () => {
  it('returns an empty array if arguments are incompatible', () => {
    expect(range({ start: 0, stop: -3 })).toEqual([]);
    expect(range({ start: 8, stop: 2 })).toEqual([]);
    expect(range({ start: -4, stop: -6 })).toEqual([]);
  });

  it('returns an array with values between start and stop', () => {
    expect(range({ start: 1, stop: 1 })).toEqual([1]);
    expect(range({ start: 0, stop: 3 })).toEqual([0, 1, 2, 3]);
    expect(range({ start: 2, stop: 7 })).toEqual([2, 3, 4, 5, 6, 7]);
  });

  it('returns an array with values between start and stop at each step increment', () => {
    expect(range({ start: 0, stop: 5, step: 1 })).toEqual([0, 1, 2, 3, 4, 5]);
    expect(range({ start: 3, stop: 9, step: 3 })).toEqual([3, 6, 9]);
    expect(range({ start: 3, stop: 9, step: 3 })).toEqual([3, 6, 9]);
    expect(range({ start: 10, stop: 40, step: 10 })).toEqual([10, 20, 30, 40]);
  });
});
