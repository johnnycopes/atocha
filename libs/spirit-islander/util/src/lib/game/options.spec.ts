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

    it('returns correct options when initialized with no expansions', () => {
      const options = new Options([]);

      expect(options.spirits).toEqual([
        { name: 'A Spread of Rampant Green' },
        { name: 'Bringer of Dreams and Nightmares' },
        { name: "Lightning's Swift Strike" },
        { name: "Ocean's Hungry Grasp" },
        { name: 'River Surges in Sunlight' },
        { name: 'Shadows Flicker Like Flame' },
        { name: 'Thunderspeaker' },
        { name: 'Vital Strength of the Earth' },
      ]);

      expect(options.boards).toEqual([
        { name: 'A', thematicName: 'Northeast' },
        { name: 'B', thematicName: 'East' },
        { name: 'C', thematicName: 'Northwest' },
        { name: 'D', thematicName: 'West' },
      ]);
    });

    it('returns correct options when initialized with expansions', () => {
      const options = new Options(['Branch & Claw', 'Jagged Earth']);

      expect(options.spirits).toEqual([
        { name: 'A Spread of Rampant Green' },
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Fractured Days Split the Sky', expansion: 'Jagged Earth' },
        {
          name: 'Grinning Trickster Stirs Up Trouble',
          expansion: 'Jagged Earth',
        },
        { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
        { name: "Lightning's Swift Strike" },
        { name: 'Lure of the Deep Wilderness', expansion: 'Jagged Earth' },
        { name: 'Many Minds Move as One', expansion: 'Jagged Earth' },
        { name: "Ocean's Hungry Grasp" },
        { name: 'River Surges in Sunlight' },
        { name: 'Shadows Flicker Like Flame' },
        { name: 'Sharp Fangs Behind the Leaves', expansion: 'Branch & Claw' },
        { name: 'Shifting Memory of Ages', expansion: 'Jagged Earth' },
        { name: 'Shroud of Silent Mist', expansion: 'Jagged Earth' },
        { name: 'Starlight Seeks Its Form', expansion: 'Jagged Earth' },
        { name: "Stone's Unyielding Defiance", expansion: 'Jagged Earth' },
        { name: 'Thunderspeaker' },
        { name: 'Vengeance as a Burning Plague', expansion: 'Jagged Earth' },
        { name: 'Vital Strength of the Earth' },
        { name: 'Volcano Looming High', expansion: 'Jagged Earth' },
      ]);

      expect(options.boards).toEqual([
        { name: 'A', thematicName: 'Northeast' },
        { name: 'B', thematicName: 'East' },
        { name: 'C', thematicName: 'Northwest' },
        { name: 'D', thematicName: 'West' },
        {
          name: 'E',
          thematicName: 'Southeast',
          expansion: 'Jagged Earth',
        },
        {
          name: 'F',
          thematicName: 'Southwest',
          expansion: 'Jagged Earth',
        },
      ]);
    });

    it('returns correct options when updated', () => {
      const options = new Options(['Promo Pack 1']);
      options.update(['Promo Pack 1', 'Promo Pack 2']);

      expect(options.spirits).toEqual([
        { name: 'A Spread of Rampant Green' },
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
        { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
        { name: 'Heart of the Wildfire', expansion: 'Promo Pack 1' },
        { name: "Lightning's Swift Strike" },
        { name: "Ocean's Hungry Grasp" },
        { name: 'River Surges in Sunlight' },
        {
          name: 'Serpent Slumbering Beneath the Island',
          expansion: 'Promo Pack 1',
        },
        { name: 'Shadows Flicker Like Flame' },
        { name: 'Thunderspeaker' },
        { name: 'Vital Strength of the Earth' },
      ]);

      expect(options.boards).toEqual([
        { name: 'A', thematicName: 'Northeast' },
        { name: 'B', thematicName: 'East' },
        { name: 'C', thematicName: 'Northwest' },
        { name: 'D', thematicName: 'West' },
      ]);
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
