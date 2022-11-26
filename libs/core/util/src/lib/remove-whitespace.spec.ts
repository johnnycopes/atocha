import { removeWhitespace } from './remove-whitespace';

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
