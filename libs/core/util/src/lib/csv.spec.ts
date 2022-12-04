import { Csv } from './csv';

describe('Csv', () => {
  let csv: Csv;
  beforeEach(() => {
    csv = new Csv({} as Document);
  });

  it('initializes with Document object passed in', () => {
    expect(csv).toBeDefined();
  });

  it('formats standard strings in correct syntax', () => {
    expect(csv.formatCsvStr('this is a sentence')).toBe('"this is a sentence"');
  });

  it('formats multiline strings in correct syntax', () => {
    expect(
      csv.formatCsvStr(`
        this is a sentence with  large  gaps and
        excessive whitespace
      `)
    ).toBe('"this is a sentence with large gaps and excessive whitespace"');
  });
});
