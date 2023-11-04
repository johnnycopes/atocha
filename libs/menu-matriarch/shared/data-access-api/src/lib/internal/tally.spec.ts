import { tally } from './tally';

describe('tally', () => {
  it('tallies nothing', () => {
    expect(tally([])).toEqual({});
  });

  it('tallies strings', () => {
    expect(
      tally([
        'apple',
        'banana',
        'kiwi',
        'kiwi',
        'strawberry',
        'apple',
        'kiwi',
        'watermelon',
        'banana',
      ])
    ).toEqual({
      apple: 2,
      banana: 2,
      kiwi: 3,
      strawberry: 1,
      watermelon: 1,
    });
  });
});
