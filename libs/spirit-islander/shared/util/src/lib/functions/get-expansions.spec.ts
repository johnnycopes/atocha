import { getExpansions } from './get-expansions';

describe('getExpansions', () => {
  it('returns all game expansions', () => {
    expect(getExpansions()).toEqual([
      'Branch & Claw',
      'Horizons',
      'Jagged Earth',
      'Nature Incarnate',
      'Promo Pack 1',
      'Promo Pack 2',
    ]);
  });
});
