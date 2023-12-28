import { recordToArray } from './record-to-array';

describe('recordToArray', () => {
  it('converts an empty record to an empty array', () => {
    expect(recordToArray({})).toStrictEqual([]);
  });

  it('converts a record of strings to an array of strings', () => {
    expect(
      recordToArray({
        pepperoni: false,
        onions: true,
        anchovies: false,
      })
    ).toStrictEqual(['onions']);
  });

  it('converts a record of numbers to an array of strings', () => {
    expect(
      recordToArray({
        1: true,
        2: true,
        3: false,
      })
    ).toStrictEqual(['1', '2']);
  });
});
