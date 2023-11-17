import { Options } from './options';
import { SPIRITS, BOARDS } from './data';
import { DifficultyOption } from './option';
import { Spirit, SpiritName } from './spirits';
import { Board } from './boards';

describe('Options', () => {
  describe('accessing options', () => {
    it('returns all options statically', () => {
      expect(Options.allSpirits).toEqual(SPIRITS);
      expect(Options.allBoards).toEqual(BOARDS);
    });
  });

  describe('getDifficulty', () => {
    it('returns static difficulty value', () => {
      const mockItem: DifficultyOption<string> = {
        name: 'Fake Item',
        difficulty: 4,
      };
      expect(Options.getDifficulty(mockItem.difficulty, [])).toBe(4);
      expect(
        Options.getDifficulty(mockItem.difficulty, ['Branch & Claw'])
      ).toBe(4);
      expect(Options.getDifficulty(mockItem.difficulty, ['Jagged Earth'])).toBe(
        4
      );
      expect(
        Options.getDifficulty(mockItem.difficulty, [
          'Branch & Claw',
          'Jagged Earth',
        ])
      ).toBe(4);
      expect(Options.getDifficulty(mockItem.difficulty, ['Promo Pack 1'])).toBe(
        4
      );
      expect(Options.getDifficulty(mockItem.difficulty, ['Promo Pack 2'])).toBe(
        4
      );
      expect(
        Options.getDifficulty(mockItem.difficulty, [
          'Promo Pack 1',
          'Promo Pack 2',
        ])
      ).toBe(4);
      expect(
        Options.getDifficulty(mockItem.difficulty, [
          'Branch & Claw',
          'Jagged Earth',
          'Promo Pack 1',
          'Promo Pack 2',
        ])
      ).toBe(4);
    });

    it('returns dynamic difficulty value', () => {
      const mockItem: DifficultyOption<string> = {
        name: 'Fake Item',
        difficulty: (expansions) => {
          if (expansions.length >= 2) {
            return 8;
          } else if (
            expansions.some((expansion) => expansion === 'Promo Pack 1')
          ) {
            return 4;
          } else if (
            expansions.some((expansion) => expansion === 'Promo Pack 2')
          ) {
            return 3;
          }
          return 1;
        },
      };
      expect(Options.getDifficulty(mockItem.difficulty, [])).toBe(1);
      expect(
        Options.getDifficulty(mockItem.difficulty, ['Branch & Claw'])
      ).toBe(1);
      expect(Options.getDifficulty(mockItem.difficulty, ['Jagged Earth'])).toBe(
        1
      );
      expect(
        Options.getDifficulty(mockItem.difficulty, [
          'Branch & Claw',
          'Jagged Earth',
        ])
      ).toBe(8);
      expect(Options.getDifficulty(mockItem.difficulty, ['Promo Pack 1'])).toBe(
        4
      );
      expect(Options.getDifficulty(mockItem.difficulty, ['Promo Pack 2'])).toBe(
        3
      );
      expect(
        Options.getDifficulty(mockItem.difficulty, [
          'Promo Pack 1',
          'Promo Pack 2',
        ])
      ).toBe(8);
      expect(
        Options.getDifficulty(mockItem.difficulty, [
          'Branch & Claw',
          'Jagged Earth',
          'Promo Pack 1',
          'Promo Pack 2',
        ])
      ).toBe(8);
    });
  });

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
      expect(Options.getOptionsByName(mockSpirits, spiritNames)).toStrictEqual([
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
      ]);

      expect(
        Options.getOptionsByName<SpiritName, Spirit>(mockSpirits, [
          'Fractured Days Split the Sky',
          'Downpour Drenches the World',
        ])
      ).toStrictEqual([
        { name: 'Fractured Days Split the Sky', expansion: 'Jagged Earth' },
        { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
      ]);
    });
  });

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

    it('get spirits by expansion name', () => {
      expect(Options.getOptionsByExpansion(mockSpirits, [])).toStrictEqual([
        { name: 'Bringer of Dreams and Nightmares' },
      ]);

      expect(
        Options.getOptionsByExpansion(mockSpirits, ['Branch & Claw'])
      ).toStrictEqual([
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
      ]);

      expect(
        Options.getOptionsByExpansion(mockSpirits, [
          'Promo Pack 1',
          'Promo Pack 2',
        ])
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
      expect(Options.getOptionsByExpansion(mockBoards, [])).toStrictEqual([
        { name: 'D', thematicName: 'West' },
      ]);

      expect(
        Options.getOptionsByExpansion(mockBoards, ['Jagged Earth'])
      ).toStrictEqual([
        { name: 'D', thematicName: 'West' },
        { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
      ]);
    });
  });
});
