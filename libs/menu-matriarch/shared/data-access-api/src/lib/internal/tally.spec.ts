import { Tally } from './tally';

describe('Tally', () => {
  describe('initializing', () => {
    it('returns values when passed nothing', () => {
      const tally = new Tally();
      expect(tally.values).toEqual({});
    });

    it('returns values when passed items', () => {
      const tally = new Tally([
        'apple',
        'banana',
        'kiwi',
        'kiwi',
        'strawberry',
        'apple',
        'kiwi',
        'watermelon',
        'banana',
      ]);
      expect(tally.values).toEqual({
        apple: 2,
        banana: 2,
        kiwi: 3,
        strawberry: 1,
        watermelon: 1,
      });
    });
  });
});
