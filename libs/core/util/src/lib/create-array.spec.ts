import { createArray } from './create-array';

describe('createArray', () => {
  it('returns an empty array if arguments are incompatible', () => {
    expect(createArray({ start: 0, stop: -3 })).toEqual([]);
    expect(createArray({ start: 8, stop: 2 })).toEqual([]);
    expect(createArray({ start: -4, stop: -6 })).toEqual([]);
  });

  it('returns an array with values between start and stop', () => {
    expect(createArray({ start: 1, stop: 1 })).toEqual([1]);
    expect(createArray({ start: 0, stop: 3 })).toEqual([0, 1, 2, 3]);
    expect(createArray({ start: 2, stop: 7 })).toEqual([2, 3, 4, 5, 6, 7]);
  });

  it('returns an array with values between start and stop at each step increment', () => {
    expect(createArray({ start: 0, stop: 5, step: 1 })).toEqual([
      0, 1, 2, 3, 4, 5,
    ]);
    expect(createArray({ start: 3, stop: 9, step: 3 })).toEqual([3, 6, 9]);
    expect(createArray({ start: 3, stop: 9, step: 3 })).toEqual([3, 6, 9]);
    expect(createArray({ start: 10, stop: 40, step: 10 })).toEqual([
      10, 20, 30, 40,
    ]);
  });
});
