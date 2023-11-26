import { getSpiritsByExpansion } from './get-spirits-by-expansion';

describe('getSpiritsByExpansion', () => {
  it('returns spirits from certain expansions', () => {
    expect(
      getSpiritsByExpansion(
        [
          { name: 'A Spread of Rampant Green', expansion: 'Branch & Claw' },
          { name: "Stone's Unyielding Defiance", expansion: 'Jagged Earth' },
        ],
        ['Branch & Claw']
      )
    ).toEqual([
      { name: 'A Spread of Rampant Green', expansion: 'Branch & Claw' },
    ]);
  });
});
