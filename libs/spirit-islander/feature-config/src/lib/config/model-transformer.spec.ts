import { ModelTransformer } from './model-transformer';
import {
  createAdversariesTree,
  createExpansionsTree,
  createSpiritsTree,
} from './create-tree';

describe('ModelTransformer', () => {
  describe('with shallow tree', () => {
    let transformer = new ModelTransformer(createExpansionsTree());

    beforeEach(() => {
      transformer = new ModelTransformer(createExpansionsTree());
    });

    it('transforms empty array model', () => {
      expect(transformer.toObj([])).toEqual({});
    });

    it('transforms partial array model', () => {
      expect(transformer.toObj(['Horizons'])).toEqual({
        Expansions: 'indeterminate',
        Horizons: 'checked',
      });
    });

    it('transforms full array model', () => {
      expect(
        transformer.toObj([
          'Branch & Claw',
          'Horizons',
          'Jagged Earth',
          'Promo Pack 1',
          'Promo Pack 2',
        ])
      ).toEqual({
        Expansions: 'checked',
        'Branch & Claw': 'checked',
        Horizons: 'checked',
        'Jagged Earth': 'checked',
        'Promo Pack 1': 'checked',
        'Promo Pack 2': 'checked',
      });
    });

    it('transforms empty object model', () => {
      expect(transformer.toArr({})).toEqual([]);
    });

    it('transforms partial object model', () => {
      expect(
        transformer.toArr({
          Expansions: 'indeterminate',
          Horizons: 'checked',
        })
      ).toEqual(['Horizons']);
    });

    it('transforms full object model', () => {
      expect(
        transformer.toArr({
          Expansions: 'checked',
          Horizons: 'checked',
          'Branch & Claw': 'checked',
          'Jagged Earth': 'checked',
          'Promo Pack 1': 'checked',
          'Promo Pack 2': 'checked',
        })
      ).toEqual([
        'Branch & Claw',
        'Horizons',
        'Jagged Earth',
        'Promo Pack 1',
        'Promo Pack 2',
      ]);
    });
  });

  describe('with nested tree', () => {
    let transformer = new ModelTransformer(createAdversariesTree([]));

    beforeEach(() => {
      transformer = new ModelTransformer(createAdversariesTree([]));
    });

    it('transforms empty array model', () => {
      expect(transformer.toObj([])).toEqual({});
    });

    it('transforms partial array model', () => {
      expect(transformer.toObj(['bp-0', 'sw-1'])).toEqual({
        Adversaries: 'indeterminate',
        'Brandenburg-Prussia': 'indeterminate',
        Sweden: 'indeterminate',
        'bp-0': 'checked',
        'sw-1': 'checked',
      });
    });

    it('transforms full array model', () => {
      expect(
        transformer.toObj([
          'No Adversary',
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
        ])
      ).toEqual({
        Adversaries: 'checked',
        'No Adversary': 'checked',
        'Brandenburg-Prussia': 'checked',
        England: 'checked',
        Sweden: 'checked',
        'bp-0': 'checked',
        'bp-1': 'checked',
        'bp-2': 'checked',
        'bp-3': 'checked',
        'bp-4': 'checked',
        'bp-5': 'checked',
        'bp-6': 'checked',
        'en-0': 'checked',
        'en-1': 'checked',
        'en-2': 'checked',
        'en-3': 'checked',
        'en-4': 'checked',
        'en-5': 'checked',
        'en-6': 'checked',
        'sw-0': 'checked',
        'sw-1': 'checked',
        'sw-2': 'checked',
        'sw-3': 'checked',
        'sw-4': 'checked',
        'sw-5': 'checked',
        'sw-6': 'checked',
      });
    });

    it('transforms empty object model', () => {
      expect(transformer.toArr({})).toEqual([]);
    });

    it('transforms partial object model', () => {
      expect(
        transformer.toArr({
          Adversaries: 'indeterminate',
          'Brandenburg-Prussia': 'indeterminate',
          Sweden: 'indeterminate',
          'bp-0': 'checked',
          'sw-1': 'checked',
        })
      ).toEqual(['bp-0', 'sw-1']);
    });

    it('transforms full object model', () => {
      expect(
        transformer.toArr({
          Adversaries: 'checked',
          'No Adversary': 'checked',
          'Brandenburg-Prussia': 'checked',
          England: 'checked',
          Sweden: 'checked',
          'bp-0': 'checked',
          'bp-1': 'checked',
          'bp-2': 'checked',
          'bp-3': 'checked',
          'bp-4': 'checked',
          'bp-5': 'checked',
          'bp-6': 'checked',
          'en-0': 'checked',
          'en-1': 'checked',
          'en-2': 'checked',
          'en-3': 'checked',
          'en-4': 'checked',
          'en-5': 'checked',
          'en-6': 'checked',
          'sw-0': 'checked',
          'sw-1': 'checked',
          'sw-2': 'checked',
          'sw-3': 'checked',
          'sw-4': 'checked',
          'sw-5': 'checked',
          'sw-6': 'checked',
        })
      ).toEqual([
        'No Adversary',
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
    });
  });

  describe('update functionality', () => {
    let transformer = new ModelTransformer(createSpiritsTree([]));

    beforeEach(() => {
      transformer = new ModelTransformer(createSpiritsTree([]));
    });

    it('toObj method', () => {
      expect(transformer.toObj(['Shroud of Silent Mist'])).toEqual({});

      transformer.update(createSpiritsTree(['Jagged Earth']));

      expect(transformer.toObj(['Shroud of Silent Mist'])).toEqual({
        Spirits: 'indeterminate',
        'Shroud of Silent Mist': 'checked',
      });
    });

    it('toArr method', () => {
      expect(
        transformer.toArr({
          Spirits: 'indeterminate',
          'Shroud of Silent Mist': 'checked',
        })
      ).toEqual([]);

      transformer.update(createSpiritsTree(['Jagged Earth']));

      expect(
        transformer.toArr({
          Spirits: 'indeterminate',
          'Shroud of Silent Mist': 'checked',
        })
      ).toEqual(['Shroud of Silent Mist']);
    });
  });

  describe('deeply nested tree', () => {
    const transformer = new ModelTransformer({
      id: 'Africa',
      children: [
        {
          id: 'Southern Africa',
          children: [{ id: 'Swaziland' }, { id: 'Namibia' }],
        },
        { id: 'Central Africa' },
        {
          id: 'Northern Africa',
          children: [
            {
              id: 'Morocco',
              children: [{ id: 'Marrakesh' }, { id: 'Fes' }],
            },
          ],
        },
      ],
    });

    it('recurses multiple levels', () => {
      expect(transformer.toObj(['Swaziland', 'Fes'])).toEqual({
        Africa: 'indeterminate',
        'Southern Africa': 'indeterminate',
        Swaziland: 'checked',
        'Northern Africa': 'indeterminate',
        Morocco: 'indeterminate',
        Fes: 'checked',
      });
    });
  });
});
