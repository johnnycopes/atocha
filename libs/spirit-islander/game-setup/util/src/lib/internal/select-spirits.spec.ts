import { Spirit, getNames } from '@atocha/spirit-islander/shared/util';
import { selectSpirits } from './select-spirits';

// Mock `selectRandom` to return collection untouched for predictability in testing
import * as selectRandom from './select-random';

jest
  .spyOn(selectRandom, 'selectRandom')
  .mockImplementation((options, quantity = 1) => {
    if (quantity > options.length) {
      throw new Error('More options requested than available');
    }
    return options.slice(0, quantity);
  });

describe('selectSpirits', () => {
  it('returns same number of spirits as players in any order', () => {
    const mockSpirits: readonly Spirit[] = [
      { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
      { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
      { name: 'Shifting Memory of Ages', expansion: 'Jagged Earth' },
    ];
    const mockNames = getNames(mockSpirits);
    const result = selectSpirits(mockNames, 3);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(mockSpirits[0]);
    expect(result[1]).toEqual(mockSpirits[1]);
    expect(result[2]).toEqual(mockSpirits[2]);
  });

  it('returns some spirits if players is less than spirit names', () => {
    const mockSpirits: readonly Spirit[] = [
      { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
      { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
      { name: 'Shifting Memory of Ages', expansion: 'Jagged Earth' },
    ];
    const mockNames = getNames(mockSpirits);
    const result = selectSpirits(mockNames, 2);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockSpirits[0]);
    expect(result[1]).toEqual(mockSpirits[1]);
  });

  it('throws error if players is greater than spirit names', () => {
    const mockSpirits: readonly Spirit[] = [
      { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
      { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
      { name: 'Shifting Memory of Ages', expansion: 'Jagged Earth' },
    ];
    const mockNames = getNames(mockSpirits);
    expect(() => selectSpirits(mockNames, 6)).toThrow();
  });

  it('returns only one variant of a spirit if both the base version and its aspects are requested', () => {
    const mockSpirits: readonly Spirit[] = [
      { name: 'Vital Strength of the Earth' },
      {
        name: 'Might',
        expansion: 'Promo Pack 2',
        aspectOf: 'Vital Strength of the Earth',
      },
      { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
    ];
    const mockNames = getNames(mockSpirits);
    const result = selectSpirits(mockNames, 2);
    expect(result[0]).toEqual(mockSpirits[2]);
    expect(result[1]).toEqual(mockSpirits[0]);
  });
});
