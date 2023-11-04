import { createTally } from './create-tally';

describe('createTally', () => {
  it('tallies nothing', () => {
    expect(createTally([])).toEqual({});
  });

  it('tallies strings', () => {
    expect(
      createTally([
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
