import { getOptionsByName } from './get-options-by-name';
import { Board, BalancedBoardName } from './boards';
import { Spirit, SpiritName } from './spirits';

describe('getOptionsByName', () => {
  let mockSpirits: readonly Spirit[];
  let mockBoards: readonly Board[];

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
    mockBoards = [
      { name: 'D', thematicName: 'West' },
      { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
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

  it('gets boards by name', () => {
    const boardNames: BalancedBoardName[] = ['D'];
    expect(getOptionsByName(mockBoards, boardNames)).toStrictEqual([
      { name: 'D', thematicName: 'West' },
    ]);

    expect(
      getOptionsByName<BalancedBoardName, Board>(mockBoards, ['E'])
    ).toStrictEqual([
      { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
    ]);
  });
});
