import { getSpirits } from './get-spirits';

describe('getSpirits', () => {
  it('returns spirits from base expansions no matter what', () => {
    expect(
      getSpirits(
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
      getSpirits(
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

  it('does not return aspects matching expansions if their associated spirit was excluded', () => {
    expect(
      getSpirits(
        [
          { name: 'Sharp Fangs Behind the Leaves', expansion: 'Branch & Claw' },
          {
            name: 'Encircle',
            expansion: 'Nature Incarnate',
            aspectOf: 'Sharp Fangs Behind the Leaves',
          },
          {
            name: 'Unconstrained',
            expansion: 'Nature Incarnate',
            aspectOf: 'Sharp Fangs Behind the Leaves',
          },
        ],
        ['Nature Incarnate']
      )
    ).toEqual([]);
  });
});
