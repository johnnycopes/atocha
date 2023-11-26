import { getSpiritsByExpansion } from './get-spirits-by-expansion';

describe('getSpiritsByExpansion', () => {
  it('returns spirits from base expansions no matter what', () => {
    expect(
      getSpiritsByExpansion(
        [
          { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
          { name: "Ocean's Hungry Grasp" },
          { name: 'Thunderspeaker' },
        ],
        []
      )
    ).toEqual([{ name: "Ocean's Hungry Grasp" }, { name: 'Thunderspeaker' }]);
  });

  it('returns spirits from certain expansions', () => {
    expect(
      getSpiritsByExpansion(
        [
          { name: 'A Spread of Rampant Green', expansion: 'Branch & Claw' },
          { name: 'Bringer of Dreams and Nightmares' },
          { name: "Stone's Unyielding Defiance", expansion: 'Jagged Earth' },
        ],
        ['Branch & Claw']
      )
    ).toEqual([
      { name: 'A Spread of Rampant Green', expansion: 'Branch & Claw' },
      { name: 'Bringer of Dreams and Nightmares' },
    ]);
  });
});
