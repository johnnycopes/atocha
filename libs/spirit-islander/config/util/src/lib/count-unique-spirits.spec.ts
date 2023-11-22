import { countUniqueSpirits } from './count-unique-spirits';
import { SPIRITS, getNames } from '@atocha/spirit-islander/shared/util';

describe('countUniqueSpirits', () => {
  it('returns the number of unique spirits given some spirit names', () => {
    expect(
      countUniqueSpirits([
        'A Spread of Rampant Green',
        'Shadows Flicker Like Flame',
        'Madness',
      ])
    ).toBe(2);
  });

  it('returns the number of unique spirits given all spirit names', () => {
    expect(countUniqueSpirits(getNames(SPIRITS))).toBe(29);
  });
});
