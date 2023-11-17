import { Options } from './options';
import { SPIRITS, BOARDS } from './data';
import { Spirit, SpiritName } from './spirits';
import { Board } from './boards';

describe('Options', () => {
  describe('accessing options', () => {
    it('returns all options statically', () => {
      expect(Options.allSpirits).toEqual(SPIRITS);
      expect(Options.allBoards).toEqual(BOARDS);
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
