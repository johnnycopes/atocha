import { Tally } from './tally';

describe('Tally', () => {
  const MOCK_ITEMS: readonly string[] = [
    'fruits',
    'vegetables',
    'fruits',
    'fruits',
  ];

  describe('calculateChange', () => {
    let tally: Tally;

    beforeEach(() => {
      tally = new Tally(MOCK_ITEMS);
    });

    it('throws an error on decrement or clear when value does not exist in tally', () => {
      expect(() => tally.calculateChange('fake', 'decrement')).toThrowError(
        'Cannot decrement or clear value: key is not present in tally'
      );

      expect(() => tally.calculateChange('fake', 'clear')).toThrowError(
        'Cannot decrement or clear value: key is not present in tally'
      );
    });

    it('returns 1 on increment when value does not exist in tally', () => {
      expect(tally.calculateChange('produce', 'increment')).toBe(1);
    });

    it('returns 0 on increment when value is greater than 0', () => {
      expect(tally.calculateChange('vegetables', 'increment')).toBe(0);
    });

    it('returns 0 on decrement when value is greater than 1', () => {
      expect(tally.calculateChange('fruits', 'decrement')).toBe(0);
    });

    it('returns -1 on decrement when value is 1', () => {
      expect(tally.calculateChange('vegetables', 'decrement')).toBe(-1);
    });

    it('returns -1 on clear, regardless of value', () => {
      expect(tally.calculateChange('fruits', 'clear')).toBe(-1);
      expect(tally.calculateChange('vegetables', 'clear')).toBe(-1);
    });
  });
});
