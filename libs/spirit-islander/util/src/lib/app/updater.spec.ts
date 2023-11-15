import { Updater } from './updater';

describe('Updater', () => {
  describe("adding individual expansion's options", () => {
    it('starting with no names selected', () => {
      const updater = new Updater();

      expect(
        updater.update(['Branch & Claw'], 'Branch & Claw').spiritNames
      ).toEqual([
        'Keeper of the Forbidden Wilds',
        'Sharp Fangs Behind the Leaves',
      ]);

      expect(updater.update([], 'Branch & Claw').spiritNames).toStrictEqual([]);
    });

    it('starting with some names selected', () => {
      const updater = new Updater({
        spiritNames: ['Heart of the Wildfire', 'Thunderspeaker'],
      });

      expect(
        updater.update(['Branch & Claw', 'Promo Pack 1'], 'Branch & Claw')
          .spiritNames
      ).toEqual([
        'Heart of the Wildfire',
        'Thunderspeaker',
        'Keeper of the Forbidden Wilds',
        'Sharp Fangs Behind the Leaves',
      ]);
    });
  });

  describe("adding all expansion's options", () => {
    it('starting with no names selected', () => {
      const updater = new Updater();

      expect(
        updater.update(
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
        'Lure of the Deep Wilderness',
        'Many Minds Move as One',
        'Serpent Slumbering Beneath the Island',
        'Sharp Fangs Behind the Leaves',
        'Shifting Memory of Ages',
        'Shroud of Silent Mist',
        'Starlight Seeks Its Form',
        "Stone's Unyielding Defiance",
        'Vengeance as a Burning Plague',
        'Volcano Looming High',
      ]);
    });

    it('starting with one name selected', () => {
      const updater = new Updater({ spiritNames: ['Thunderspeaker'] });

      expect(
        updater.update(
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
        'Lure of the Deep Wilderness',
        'Many Minds Move as One',
        'Serpent Slumbering Beneath the Island',
        'Sharp Fangs Behind the Leaves',
        'Shifting Memory of Ages',
        'Shroud of Silent Mist',
        'Starlight Seeks Its Form',
        "Stone's Unyielding Defiance",
        'Vengeance as a Burning Plague',
        'Volcano Looming High',
      ]);
    });

    it('starting with multiple names selected', () => {
      const updater = new Updater({
        spiritNames: ['Keeper of the Forbidden Wilds', 'Thunderspeaker'],
      });

      expect(
        updater.update(
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
        'Lure of the Deep Wilderness',
        'Many Minds Move as One',
        'Serpent Slumbering Beneath the Island',
        'Sharp Fangs Behind the Leaves',
        'Shifting Memory of Ages',
        'Shroud of Silent Mist',
        'Starlight Seeks Its Form',
        "Stone's Unyielding Defiance",
        'Vengeance as a Burning Plague',
        'Volcano Looming High',
      ]);
    });
  });

  describe("removing individual expansion's options", () => {
    it('leaves zero names', () => {
      const updater = new Updater({
        spiritNames: [
          'Keeper of the Forbidden Wilds',
          'Sharp Fangs Behind the Leaves',
        ],
      });

      expect(updater.update([], 'Branch & Claw').spiritNames).toEqual([]);
    });

    it('leaves one name', () => {
      const updater = new Updater({
        spiritNames: [
          'Keeper of the Forbidden Wilds',
          'Sharp Fangs Behind the Leaves',
          'Thunderspeaker',
        ],
      });

      expect(updater.update([], 'Branch & Claw').spiritNames).toEqual([
        'Thunderspeaker',
      ]);
    });

    it('leaves two names', () => {
      const updater = new Updater({
        spiritNames: [
          'Heart of the Wildfire',
          'Keeper of the Forbidden Wilds',
          'Sharp Fangs Behind the Leaves',
          'Thunderspeaker',
        ],
      });

      expect(
        updater.update(['Promo Pack 1'], 'Branch & Claw').spiritNames
      ).toEqual(['Heart of the Wildfire', 'Thunderspeaker']);
    });
  });

  describe("removing all expansion's options", () => {
    it('leaves zero options', () => {
      const updater = new Updater();

      expect(updater.update([], 'Expansions').spiritNames).toEqual([]);
    });

    it('leaves zero options when nothing selected', () => {
      const updater = new Updater();

      expect(updater.update([], 'Expansions').spiritNames).toEqual([]);
    });

    it('leaves base option(s) selected', () => {
      const updater = new Updater({ spiritNames: ['Thunderspeaker'] });

      expect(updater.update([], 'Expansions').spiritNames).toEqual([
        'Thunderspeaker',
      ]);
    });

    it('leaves base option(s) selected, removing expansion options', () => {
      const updater = new Updater({
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

      expect(updater.update([], 'Expansions').spiritNames).toEqual([
        'Thunderspeaker',
      ]);
    });
  });
});
