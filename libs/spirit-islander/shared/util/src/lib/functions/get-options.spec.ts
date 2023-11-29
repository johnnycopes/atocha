import { getOptions } from './get-options';
import { BalancedBoardName, Board, Spirit, SpiritName } from '../types';

describe('getOptions', () => {
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

  describe('with both filters applied', () => {
    it('throws error', () => {
      expect(() =>
        getOptions<SpiritName, Spirit>(mockSpirits, {
          expansions: [],
          names: [],
        })
      ).toThrowError(
        'Options can only be filtered by expansions OR names (not both at once)'
      );
    });
  });

  describe('with no filters applied', () => {
    it('returns spirits untouched if filters argument is omitted', () => {
      expect(getOptions(mockSpirits)).toStrictEqual(mockSpirits);
    });

    it('returns boards untouched if filters argument is omitted', () => {
      expect(getOptions(mockBoards)).toStrictEqual(mockBoards);
    });
  });

  describe('with expansions filter applied', () => {
    it('returns base game spirits when array is empty', () => {
      expect(
        getOptions<SpiritName, Spirit>(mockSpirits, { expansions: [] })
      ).toStrictEqual([{ name: 'Bringer of Dreams and Nightmares' }]);
    });

    it('returns base game + expansion spirits when expansions are specified', () => {
      expect(
        getOptions(mockSpirits, {
          expansions: ['Promo Pack 1', 'Promo Pack 2'],
        })
      ).toStrictEqual([
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
        {
          name: 'Serpent Slumbering Beneath the Island',
          expansion: 'Promo Pack 1',
        },
      ]);
    });

    it('returns base game boards when array is empty', () => {
      expect(getOptions(mockBoards, { expansions: [] })).toStrictEqual([
        { name: 'D', thematicName: 'West' },
      ]);
    });

    it('returns base game + expansion boards when expansions are specified', () => {
      expect(
        getOptions(mockBoards, { expansions: ['Jagged Earth'] })
      ).toStrictEqual([
        { name: 'D', thematicName: 'West' },
        { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
      ]);
    });
  });

  describe('with names filter applied', () => {
    it('returns no spirits when array is empty', () => {
      expect(
        getOptions<SpiritName, Spirit>(mockSpirits, { names: [] })
      ).toEqual([]);
    });

    it('returns no boards when array is empty', () => {
      expect(
        getOptions<BalancedBoardName, Board>(mockBoards, { names: [] })
      ).toEqual([]);
    });

    it('returns matching spirits when names are specified', () => {
      expect(
        getOptions<SpiritName, Spirit>(mockSpirits, {
          names: [
            'Bringer of Dreams and Nightmares',
            'Downpour Drenches the World',
          ],
        })
      ).toEqual([
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
      ]);
    });

    it('returns matching boards when names are specified', () => {
      expect(
        getOptions<BalancedBoardName, Board>(mockBoards, {
          names: ['E'],
        })
      ).toEqual([
        { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
      ]);
    });
  });
});
