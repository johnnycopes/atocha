import { getOptionsFactory } from './get-options-factory';
import { Spirit, SpiritName } from '../types';

describe('getOptionsFactory', () => {
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

  describe('with both filters applied', () => {
    it('throws error', () => {
      const getOptions = getOptionsFactory<SpiritName, Spirit>(mockSpirits);
      expect(() =>
        getOptions({
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
      const getOptions = getOptionsFactory<SpiritName, Spirit>(mockSpirits);
      expect(getOptions()).toStrictEqual(mockSpirits);
    });
  });

  describe('with expansions filter applied', () => {
    it('returns base game spirits when array is empty', () => {
      const getOptions = getOptionsFactory<SpiritName, Spirit>(mockSpirits);
      expect(getOptions({ expansions: [] })).toStrictEqual([
        { name: 'Bringer of Dreams and Nightmares' },
      ]);
    });

    it('returns base game + expansion spirits when expansions are specified', () => {
      const getOptions = getOptionsFactory<SpiritName, Spirit>(mockSpirits);
      expect(
        getOptions({
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
  });

  describe('with names filter applied', () => {
    it('returns no spirits when array is empty', () => {
      const getOptions = getOptionsFactory<SpiritName, Spirit>(mockSpirits);
      expect(getOptions({ names: [] })).toEqual([]);
    });

    it('returns no boards when array is empty', () => {
      const getOptions = getOptionsFactory<SpiritName, Spirit>(mockSpirits);
      expect(getOptions({ names: [] })).toEqual([]);
    });

    it('returns matching spirits when names are specified', () => {
      const getOptions = getOptionsFactory<SpiritName, Spirit>(mockSpirits);
      expect(
        getOptions({
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
  });
});
