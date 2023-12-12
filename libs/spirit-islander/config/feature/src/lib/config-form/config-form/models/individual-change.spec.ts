import { Models } from './models';

describe('Models individual change', () => {
  describe("adding individual expansion's options", () => {
    it('starting with no names selected', () => {
      const models = new Models();

      expect(
        models.update(['Branch & Claw'], 'Branch & Claw').spiritNames
      ).toEqual([
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
      ).toEqual([
        'Heart of the Wildfire',
        'Thunderspeaker',
        'Keeper of the Forbidden Wilds',
        'Sharp Fangs Behind the Leaves',
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

      expect(models.update([], 'Branch & Claw').spiritNames).toEqual([]);
    });

    it('leaves one name', () => {
      const models = new Models({
        spiritNames: [
          'Keeper of the Forbidden Wilds',
          'Sharp Fangs Behind the Leaves',
          'Thunderspeaker',
        ],
      });

      expect(models.update([], 'Branch & Claw').spiritNames).toEqual([
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
      ).toEqual(['Heart of the Wildfire', 'Thunderspeaker']);
    });
  });
});
