import { countSpirits } from './count-spirits';
import { SPIRITS, getNames } from '@atocha/spirit-islander/shared/util';

describe('countSpirits', () => {
  it('returns the number of unique spirits given some spirit names', () => {
    expect(
      countSpirits([
        'A Spread of Rampant Green',
        'Shadows Flicker Like Flame',
        'Madness',
      ])
    ).toBe(2);
  });

  it('returns the number of unique spirits given all some spirit names', () => {
    expect(countSpirits(getNames(SPIRITS))).toBe(29);
  });
});
