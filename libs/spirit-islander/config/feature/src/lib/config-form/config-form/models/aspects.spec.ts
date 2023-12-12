import { Models } from './models';

describe('Models aspects', () => {
  describe('adjusting aspects', () => {
    it('removes aspect names from expansions while leaving base game spirit name alone', () => {
      const models = new Models({
        spiritNames: ["Lightning's Swift Strike", 'Immense'],
      });

      expect(models.update([], 'Promo Pack 2').spiritNames).toEqual([
        "Lightning's Swift Strike",
      ]);
    });

    it('removes all aspect names associated with a spirit when the spirit is removed', () => {
      const models = new Models({
        spiritNames: ['Sharp Fangs Behind the Leaves', 'Encircle', 'Warrior'],
      });

      expect(
        models.update(['Nature Incarnate'], 'Branch & Claw').spiritNames
      ).toEqual(['Warrior']);
    });
  });
});
