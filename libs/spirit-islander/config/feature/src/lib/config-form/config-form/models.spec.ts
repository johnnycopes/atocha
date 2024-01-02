import { Models } from './models';

describe('Models', () => {
  describe("adding individual expansion's options", () => {
    it('starting with no names selected', () => {
      const models = new Models();

      expect(
        models.update(['Branch & Claw'], 'Branch & Claw').spiritNames
      ).toStrictEqual([
        'Keeper of the Forbidden Wilds',
        'Sharp Fangs Behind the Leaves',
      ]);

      expect(models.update([], 'Branch & Claw').spiritNames).toStrictEqual([]);
    });

    it('starting with some names selected', () => {
      const models = new Models({
        spiritNames: ['Heart of the Wildfire', 'Thunderspeaker'],
      });

      expect(
        models.update(['Branch & Claw', 'Promo Pack 1'], 'Branch & Claw')
          .spiritNames
      ).toStrictEqual([
        'Heart of the Wildfire',
        'Thunderspeaker',
        'Keeper of the Forbidden Wilds',
        'Sharp Fangs Behind the Leaves',
      ]);
    });
  });

  describe("adding all expansion's options", () => {
    it('starting with no names selected', () => {
      const models = new Models();

      expect(
        models.update(
          ['Branch & Claw', 'Jagged Earth', 'Promo Pack 1', 'Promo Pack 2'],
          'Expansions'
        ).spiritNames
      ).toStrictEqual([
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
      ).toStrictEqual([
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
      ).toStrictEqual([
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

  describe("removing individual expansion's options", () => {
    it('leaves zero names', () => {
      const models = new Models({
        spiritNames: [
          'Keeper of the Forbidden Wilds',
          'Sharp Fangs Behind the Leaves',
        ],
      });

      expect(models.update([], 'Branch & Claw').spiritNames).toStrictEqual([]);
    });

    it('leaves one name', () => {
      const models = new Models({
        spiritNames: [
          'Keeper of the Forbidden Wilds',
          'Sharp Fangs Behind the Leaves',
          'Thunderspeaker',
        ],
      });

      expect(models.update([], 'Branch & Claw').spiritNames).toStrictEqual([
        'Thunderspeaker',
      ]);
    });

    it('leaves two names', () => {
      const models = new Models({
        spiritNames: [
          'Heart of the Wildfire',
          'Keeper of the Forbidden Wilds',
          'Sharp Fangs Behind the Leaves',
          'Thunderspeaker',
        ],
      });

      expect(
        models.update(['Promo Pack 1'], 'Branch & Claw').spiritNames
      ).toStrictEqual(['Heart of the Wildfire', 'Thunderspeaker']);
    });
  });

  describe("removing all expansion's options", () => {
    it('leaves zero options', () => {
      const models = new Models();

      expect(models.update([], 'Expansions').spiritNames).toStrictEqual([]);
    });

    it('leaves zero options when nothing selected', () => {
      const models = new Models();

      expect(models.update([], 'Expansions').spiritNames).toStrictEqual([]);
    });

    it('leaves base option(s) selected', () => {
      const models = new Models({ spiritNames: ['Thunderspeaker'] });

      expect(models.update([], 'Expansions').spiritNames).toStrictEqual([
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

      expect(models.update([], 'Expansions').spiritNames).toStrictEqual([
        'Thunderspeaker',
      ]);
    });
  });

  describe('adjusting aspects', () => {
    it('removes aspect names from expansions while leaving base game spirit name alone', () => {
      const models = new Models({
        spiritNames: ["Lightning's Swift Strike", 'Immense'],
      });

      expect(models.update([], 'Promo Pack 2').spiritNames).toStrictEqual([
        "Lightning's Swift Strike",
      ]);
    });

    it('removes all aspect names associated with a spirit when the spirit is removed', () => {
      const models = new Models({
        spiritNames: ['Sharp Fangs Behind the Leaves', 'Encircle', 'Warrior'],
      });

      expect(
        models.update(['Nature Incarnate'], 'Branch & Claw').spiritNames
      ).toStrictEqual(['Warrior']);
    });
  });
});
