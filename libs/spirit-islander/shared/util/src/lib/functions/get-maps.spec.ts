import { MAPS } from '../data';
import { getMaps } from './get-maps';

describe('getMaps', () => {
  it('returns all maps if expansions argument is omitted', () => {
    expect(getMaps()).toStrictEqual(MAPS);
  });

  it('returns maps from base game', () => {
    expect(getMaps({ expansions: [] })).toStrictEqual(MAPS);
  });

  it('returns maps from base game plus any specified expansions', () => {
    expect(
      getMaps({
        expansions: [
          'Branch & Claw',
          'Horizons',
          'Jagged Earth',
          'Nature Incarnate',
          'Promo Pack 1',
          'Promo Pack 2',
        ],
      })
    ).toStrictEqual(MAPS);
  });

  it('returns maps with certain names', () => {
    expect(getMaps({ names: ['Balanced'] })).toStrictEqual([
      { name: 'Balanced', difficulty: 0 },
    ]);
  });
});
