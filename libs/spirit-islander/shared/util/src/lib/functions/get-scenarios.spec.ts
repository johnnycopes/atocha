import { getScenarios } from './get-scenarios';

describe('getScenarios', () => {
  it('returns all scenarios if expansions argument is omitted', () => {
    expect(getScenarios()).toStrictEqual(getScenarios());
  });

  it('returns scenarios from base game', () => {
    expect(getScenarios({ expansions: [] })).toStrictEqual([
      { name: 'No Scenario', difficulty: 0 },
      { name: 'Blitz', identifier: 'Blitz', difficulty: 0 },
      {
        name: "Guard the Isle's Heart",
        identifier: 'GuardTheIslesHeart',
        difficulty: 0,
      },
      {
        name: 'Rituals of Terror',
        identifier: 'RitualsOfTerror',
        difficulty: 3,
      },
      {
        name: 'Dahan Insurrection',
        identifier: 'DahanInsurrection',
        difficulty: 4,
      },
    ]);
  });

  it('returns scenarios from base game plus any specified expansions', () => {
    expect(
      getScenarios({ expansions: ['Promo Pack 1', 'Promo Pack 2'] })
    ).toStrictEqual([
      { name: 'No Scenario', difficulty: 0 },
      { name: 'Blitz', identifier: 'Blitz', difficulty: 0 },
      {
        name: "Guard the Isle's Heart",
        identifier: 'GuardTheIslesHeart',
        difficulty: 0,
      },
      {
        name: 'A Diversity of Spirits',
        expansion: 'Promo Pack 2',
        difficulty: 0,
      },
      { name: 'Varied Terrains', difficulty: 2, expansion: 'Promo Pack 2' },
      {
        name: 'Rituals of Terror',
        identifier: 'RitualsOfTerror',
        difficulty: 3,
      },
      {
        name: 'Dahan Insurrection',
        identifier: 'DahanInsurrection',
        difficulty: 4,
      },
    ]);
  });

  it('returns scenarios with certain names', () => {
    expect(
      getScenarios({ names: ['Destiny Unfolds', 'Ward the Shores'] })
    ).toStrictEqual([
      {
        name: 'Destiny Unfolds',
        difficulty: -1,
        expansion: 'Nature Incarnate',
      },
      {
        name: 'Ward the Shores',
        identifier: 'WardTheShores',
        difficulty: 2,
        expansion: 'Branch & Claw',
      },
    ]);
  });
});
