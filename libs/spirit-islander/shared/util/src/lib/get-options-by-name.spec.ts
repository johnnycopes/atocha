import { getOptionsByName } from './get-options-by-name';
import { Spirit, SpiritName } from './types';

describe('getOptionsByName', () => {
  let mockSpirits: readonly Spirit[];

  beforeEach(() => {
    mockSpirits = [
      { name: 'Bringer of Dreams and Nightmares' },
      { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
      { name: 'Fractured Days Split the Sky', expansion: 'Jagged Earth' },
      { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
      {
        name: 'Serpent Slumbering Beneath the Island',
        expansion: 'Promo Pack 1',
      },
    ];
  });

  it('gets spirits by name', () => {
    const spiritNames: SpiritName[] = [
      'Bringer of Dreams and Nightmares',
      'Keeper of the Forbidden Wilds',
    ];
    expect(getOptionsByName(mockSpirits, spiritNames)).toStrictEqual([
      { name: 'Bringer of Dreams and Nightmares' },
      { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
    ]);

    expect(
      getOptionsByName<SpiritName, Spirit>(mockSpirits, [
        'Fractured Days Split the Sky',
        'Downpour Drenches the World',
      ])
    ).toStrictEqual([
      { name: 'Fractured Days Split the Sky', expansion: 'Jagged Earth' },
      { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
    ]);
  });
});
