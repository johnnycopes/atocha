import { recordToArray } from "./record-to-array";

describe('recordToArray', () => {
  it('converts an empty record to an empty array', () => {
    expect(recordToArray({})).toEqual([]);
  });

  it('converts a record of strings to an array of strings', () => {
    expect(recordToArray({
      'pepperoni': false,
      'onions': true,
      'anchovies': false,
    })).toEqual(['onions']);
  });

  it('converts a record of numbers to an array of strings', () => {
    expect(recordToArray({
      1: true,
      2: true,
      3: false,
    })).toEqual(['1', '2']);
  });
});
