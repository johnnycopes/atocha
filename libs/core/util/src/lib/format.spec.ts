import { lower, snakeCase, upper, upperFirst } from './format';

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

  describe('snakeCase', () => {
    it("doesn't affect an empty string", () => {
      expect(snakeCase('')).toBe('');
    });

    it('transforms a lowercase string with spaces', () => {
      expect(snakeCase('unique object identifier')).toBe(
        'unique-object-identifier'
      );
    });

    it('transforms an uppercase string with spaces', () => {
      expect(snakeCase('UNIQUE OBJECT IDENTIFIER')).toBe(
        'unique-object-identifier'
      );
    });
  });
});
