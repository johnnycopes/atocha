import { getScenarios } from './get-scenarios';

describe('getScenarios', () => {
  it('returns all boards if expansions argument is omitted', () => {
    expect(getScenarios()).toEqual(getScenarios());
  });

  it('returns scenarios from base game', () => {
    expect(getScenarios({ expansions: [] })).toEqual([
      { name: 'No Scenario', difficulty: 0 },
      { name: 'Blitz', difficulty: 0 },
      { name: "Guard the Isle's Heart", difficulty: 0 },
      { name: 'Rituals of Terror', difficulty: 3 },
      { name: 'Dahan Insurrection', difficulty: 4 },
    ]);
  });

  it('returns scenarios from base game plus any specified expansions', () => {
    expect(
      getScenarios({ expansions: ['Promo Pack 1', 'Promo Pack 2'] })
    ).toEqual([
      { name: 'No Scenario', difficulty: 0 },
      { name: 'Blitz', difficulty: 0 },
      { name: "Guard the Isle's Heart", difficulty: 0 },
      {
        name: 'A Diversity of Spirits',
        expansion: 'Promo Pack 2',
        difficulty: 0,
      },
      { name: 'Varied Terrains', difficulty: 2, expansion: 'Promo Pack 2' },
      { name: 'Rituals of Terror', difficulty: 3 },
      { name: 'Dahan Insurrection', difficulty: 4 },
    ]);
  });
});
