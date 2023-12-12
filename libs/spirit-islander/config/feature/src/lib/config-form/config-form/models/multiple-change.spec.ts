import { Models } from './models';

describe('Models multiple change', () => {
  describe("adding all expansion's options", () => {
    it('starting with no names selected', () => {
      const models = new Models();

      expect(
        models.update(
          ['Branch & Claw', 'Jagged Earth', 'Promo Pack 1', 'Promo Pack 2'],
          'Expansions'
        ).spiritNames
      ).toEqual([
        'Downpour Drenches the World',
        'Finder of Paths Unseen',
        'Fractured Days Split the Sky',
        'Grinning Trickster Stirs Up Trouble',
        'Heart of the Wildfire',
        'Keeper of the Forbidden Wilds',
        'Immense',
        'Pandemonium',
        'Wind',
        'Lure of the Deep Wilderness',
        'Many Minds Move as One',
        'Sunshine',
        'Travel',
        'Serpent Slumbering Beneath the Island',
        'Amorphous',
        'Foreboding',
        'Madness',
        'Reach',
        'Sharp Fangs Behind the Leaves',
        'Shifting Memory of Ages',
        'Shroud of Silent Mist',
        'Starlight Seeks Its Form',
        "Stone's Unyielding Defiance",
        'Vengeance as a Burning Plague',
        'Might',
        'Resilience',
        'Volcano Looming High',
      ]);
    });

    it('starting with one name selected', () => {
      const models = new Models({ spiritNames: ['Thunderspeaker'] });

      expect(
        models.update(
          ['Branch & Claw', 'Jagged Earth', 'Promo Pack 1', 'Promo Pack 2'],
          'Expansions'
        ).spiritNames
      ).toEqual([
        'Thunderspeaker',
        'Downpour Drenches the World',
        'Finder of Paths Unseen',
        'Fractured Days Split the Sky',
        'Grinning Trickster Stirs Up Trouble',
        'Heart of the Wildfire',
        'Keeper of the Forbidden Wilds',
        'Immense',
        'Pandemonium',
        'Wind',
        'Lure of the Deep Wilderness',
        'Many Minds Move as One',
        'Sunshine',
        'Travel',
        'Serpent Slumbering Beneath the Island',
        'Amorphous',
        'Foreboding',
        'Madness',
        'Reach',
        'Sharp Fangs Behind the Leaves',
        'Shifting Memory of Ages',
        'Shroud of Silent Mist',
        'Starlight Seeks Its Form',
        "Stone's Unyielding Defiance",
        'Vengeance as a Burning Plague',
        'Might',
        'Resilience',
        'Volcano Looming High',
      ]);
    });

    it('starting with multiple names selected', () => {
      const models = new Models({
        spiritNames: ['Keeper of the Forbidden Wilds', 'Thunderspeaker'],
      });

      expect(
        models.update(
          ['Branch & Claw', 'Jagged Earth', 'Promo Pack 1', 'Promo Pack 2'],
          'Expansions'
        ).spiritNames
      ).toEqual([
        'Keeper of the Forbidden Wilds',
        'Thunderspeaker',
        'Downpour Drenches the World',
        'Finder of Paths Unseen',
        'Fractured Days Split the Sky',
        'Grinning Trickster Stirs Up Trouble',
        'Heart of the Wildfire',
        'Immense',
        'Pandemonium',
        'Wind',
        'Lure of the Deep Wilderness',
        'Many Minds Move as One',
        'Sunshine',
        'Travel',
        'Serpent Slumbering Beneath the Island',
        'Amorphous',
        'Foreboding',
        'Madness',
        'Reach',
        'Sharp Fangs Behind the Leaves',
        'Shifting Memory of Ages',
        'Shroud of Silent Mist',
        'Starlight Seeks Its Form',
        "Stone's Unyielding Defiance",
        'Vengeance as a Burning Plague',
        'Might',
        'Resilience',
        'Volcano Looming High',
      ]);
    });
  });

  describe("removing all expansion's options", () => {
    it('leaves zero options', () => {
      const models = new Models();

      expect(models.update([], 'Expansions').spiritNames).toEqual([]);
    });

    it('leaves zero options when nothing selected', () => {
      const models = new Models();

      expect(models.update([], 'Expansions').spiritNames).toEqual([]);
    });

    it('leaves base option(s) selected', () => {
      const models = new Models({ spiritNames: ['Thunderspeaker'] });

      expect(models.update([], 'Expansions').spiritNames).toEqual([
        'Thunderspeaker',
      ]);
    });

    it('leaves base option(s) selected, removing expansion options', () => {
      const models = new Models({
        spiritNames: [
          'Downpour Drenches the World',
          'Finder of Paths Unseen',
          'Fractured Days Split the Sky',
          'Grinning Trickster Stirs Up Trouble',
          'Heart of the Wildfire',
          'Keeper of the Forbidden Wilds',
          'Lure of the Deep Wilderness',
          'Many Minds Move as One',
          'Serpent Slumbering Beneath the Island',
          'Sharp Fangs Behind the Leaves',
          'Shifting Memory of Ages',
          'Shroud of Silent Mist',
          'Starlight Seeks Its Form',
          "Stone's Unyielding Defiance",
          'Thunderspeaker',
          'Vengeance as a Burning Plague',
          'Volcano Looming High',
        ],
      });

      expect(models.update([], 'Expansions').spiritNames).toEqual([
        'Thunderspeaker',
      ]);
    });
  });
});
