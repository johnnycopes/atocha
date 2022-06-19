import { flattenValues } from "./flatten-values";

describe('flattenValues', () => {
  it('combines unique object array values into a single array', () => {
    const menu = {
      monday: [1, 2, 3],
      tuesday: [4, 5, 6],
      wednesday: [7, 8, 9],
    };
    expect(flattenValues(menu)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('combines object array values into a single array, respecting duplicates', () => {
    const menu = {
      monday: [1, 2, 3],
      tuesday: [3, 4, 5],
      wednesday: [5, 6, 7],
    };
    expect(flattenValues(menu)).toEqual([1, 2, 3, 3, 4, 5, 5, 6, 7]);
  })
});
