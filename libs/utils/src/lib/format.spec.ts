import { lower, upper, upperFirst } from "./format";

describe('formatting functions', () => {
  describe('lower', () => {
    it('transforms a string to lowercase', () => {
      expect(lower('TEST')).toEqual('test');
      expect(lower('SECOND TEST')).toEqual('second test');
    });
  });

  describe('upper', () => {
    it('transforms a string to uppercase', () => {
      expect(upper('test')).toEqual('TEST');
      expect(upper('second test')).toEqual('SECOND TEST');
    });
  });

  describe('upperFirst', () => {
    it('transforms the first letter of a string to uppercase', () => {
      expect(upperFirst('test')).toEqual('Test');
      expect(upperFirst('second test')).toEqual('Second test');
    });
  });
})
