import { getOptions } from './get-options';
import { Board, Spirit } from '../types';

describe('getOptionsByExpansion', () => {
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

  it('returns options unchanged if expansions argument is omitted', () => {
    expect(getOptions(mockSpirits)).toStrictEqual(mockSpirits);
  });

  it('get spirits by expansion name', () => {
    expect(getOptions(mockSpirits, { expansions: [] })).toStrictEqual([
      { name: 'Bringer of Dreams and Nightmares' },
    ]);

    expect(
      getOptions(mockSpirits, { expansions: ['Branch & Claw'] })
    ).toStrictEqual([
      { name: 'Bringer of Dreams and Nightmares' },
      { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
    ]);

    expect(
      getOptions(mockSpirits, { expansions: ['Promo Pack 1', 'Promo Pack 2'] })
    ).toStrictEqual([
      { name: 'Bringer of Dreams and Nightmares' },
      { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
      {
        name: 'Serpent Slumbering Beneath the Island',
        expansion: 'Promo Pack 1',
      },
    ]);
  });

  it('gets boards by expansion name', () => {
    expect(getOptions(mockBoards, { expansions: [] })).toStrictEqual([
      { name: 'D', thematicName: 'West' },
    ]);

    expect(
      getOptions(mockBoards, { expansions: ['Jagged Earth'] })
    ).toStrictEqual([
      { name: 'D', thematicName: 'West' },
      { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
    ]);
  });
});
