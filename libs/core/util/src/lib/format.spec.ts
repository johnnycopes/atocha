import {
  lower,
  removeWhitespace,
  snakeCase,
  startCase,
  upper,
  upperFirst,
} from './format';

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

  describe('startCase', () => {
    it('transforms the first letter of each word in a string to uppercase', () => {
      expect(startCase('test')).toEqual('Test');
      expect(startCase('each word should be capitalized')).toEqual(
        'Each Word Should Be Capitalized'
      );
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

  describe('removeWhitespace', () => {
    it("doesn't affect an empty string", () => {
      expect(removeWhitespace('')).toBe('');
    });

    it("doesn't affect strings without any extra whitespace", () => {
      expect(removeWhitespace('this is a typical string')).toBe(
        'this is a typical string'
      );
    });

    it('removes spaces surrounding strings', () => {
      expect(removeWhitespace('  too much surrounding space   ')).toBe(
        'too much surrounding space'
      );
    });

    it('removes newline characters', () => {
      expect(removeWhitespace('this should only\n occupy one line')).toBe(
        'this should only occupy one line'
      );
    });

    it('handles all possible whitespace issues', () => {
      expect(
        removeWhitespace(`
          There are a lot   of \n problems \r\r with   this
          particular
          string!
      `)
      ).toBe('There are a lot of problems with this particular string!');
    });
  });
});
