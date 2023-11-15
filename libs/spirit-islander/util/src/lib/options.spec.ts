import { BOARDS } from './game/boards';
import { SPIRITS } from './game/spirits';
import { Options } from './options';

describe('Options', () => {
  describe('accessing options', () => {
    it('returns all options when initialized with nothing', () => {
      const options = new Options();

      expect(options.spirits).toEqual(SPIRITS);
      expect(options.boards).toEqual(BOARDS);
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

  describe("accessing options' unique IDs", () => {
    it('returns all IDs when initialized with nothing', () => {
      const options = new Options();

      expect(options.adversaryLevelIds).toEqual([
        'none',
        'bp-0',
        'bp-1',
        'bp-2',
        'bp-3',
        'bp-4',
        'bp-5',
        'bp-6',
        'en-0',
        'en-1',
        'en-2',
        'en-3',
        'en-4',
        'en-5',
        'en-6',
        'fr-0',
        'fr-1',
        'fr-2',
        'fr-3',
        'fr-4',
        'fr-5',
        'fr-6',
        'hm-0',
        'hm-1',
        'hm-2',
        'hm-3',
        'hm-4',
        'hm-5',
        'hm-6',
        'ru-0',
        'ru-1',
        'ru-2',
        'ru-3',
        'ru-4',
        'ru-5',
        'ru-6',
        'sc-0',
        'sc-1',
        'sc-2',
        'sc-3',
        'sc-4',
        'sc-5',
        'sc-6',
        'sw-0',
        'sw-1',
        'sw-2',
        'sw-3',
        'sw-4',
        'sw-5',
        'sw-6',
      ]);

      expect(options.boardNames).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    });

    it('returns correct IDs when initialized with no expansions', () => {
      const options = new Options([]);

      expect(options.adversaryLevelIds).toEqual([
        'none',
        'bp-0',
        'bp-1',
        'bp-2',
        'bp-3',
        'bp-4',
        'bp-5',
        'bp-6',
        'en-0',
        'en-1',
        'en-2',
        'en-3',
        'en-4',
        'en-5',
        'en-6',
        'sw-0',
        'sw-1',
        'sw-2',
        'sw-3',
        'sw-4',
        'sw-5',
        'sw-6',
      ]);

      expect(options.boardNames).toEqual(['A', 'B', 'C', 'D']);
    });

    it('returns correct IDs when initialized with with expansions', () => {
      const options = new Options(['Branch & Claw', 'Jagged Earth']);

      expect(options.adversaryLevelIds).toEqual([
        'none',
        'bp-0',
        'bp-1',
        'bp-2',
        'bp-3',
        'bp-4',
        'bp-5',
        'bp-6',
        'en-0',
        'en-1',
        'en-2',
        'en-3',
        'en-4',
        'en-5',
        'en-6',
        'fr-0',
        'fr-1',
        'fr-2',
        'fr-3',
        'fr-4',
        'fr-5',
        'fr-6',
        'hm-0',
        'hm-1',
        'hm-2',
        'hm-3',
        'hm-4',
        'hm-5',
        'hm-6',
        'ru-0',
        'ru-1',
        'ru-2',
        'ru-3',
        'ru-4',
        'ru-5',
        'ru-6',
        'sw-0',
        'sw-1',
        'sw-2',
        'sw-3',
        'sw-4',
        'sw-5',
        'sw-6',
      ]);

      expect(options.boardNames).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    });

    it('returns correct IDs when updated', () => {
      const options = new Options(['Promo Pack 1']);
      options.update(['Promo Pack 1', 'Promo Pack 2']);

      expect(options.adversaryLevelIds).toEqual([
        'none',
        'bp-0',
        'bp-1',
        'bp-2',
        'bp-3',
        'bp-4',
        'bp-5',
        'bp-6',
        'en-0',
        'en-1',
        'en-2',
        'en-3',
        'en-4',
        'en-5',
        'en-6',
        'sc-0',
        'sc-1',
        'sc-2',
        'sc-3',
        'sc-4',
        'sc-5',
        'sc-6',
        'sw-0',
        'sw-1',
        'sw-2',
        'sw-3',
        'sw-4',
        'sw-5',
        'sw-6',
      ]);

      expect(options.boardNames).toEqual(['A', 'B', 'C', 'D']);
    });
  });
});
