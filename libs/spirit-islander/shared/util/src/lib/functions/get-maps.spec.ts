import { MAPS } from '../data';
import { getMaps } from './get-maps';

describe('getMaps', () => {
  it('returns all maps if expansions argument is omitted', () => {
    expect(getMaps()).toEqual(MAPS);
  });

  it('returns maps from base game', () => {
    expect(getMaps([])).toEqual(MAPS);
  });

  it('returns maps from base game plus any specified expansions', () => {
    expect(
      getMaps([
        'Branch & Claw',
        'Horizons',
        'Jagged Earth',
        'Nature Incarnate',
        'Promo Pack 1',
        'Promo Pack 2',
      ])
    ).toEqual(MAPS);
  });
});
