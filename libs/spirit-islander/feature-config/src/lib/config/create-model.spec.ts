import { createAdversariesTree, createExpansionsTree } from './create-tree';
import { transformArrToObj, transformObjToArr } from './create-model';

describe('createModel', () => {
  describe('transformArrToObj', () => {
    it('converts empty array model with shallow tree', () => {
      expect(transformArrToObj(createExpansionsTree(), [])).toEqual({});
    });

    it('converts partial array model with shallow tree', () => {
      expect(transformArrToObj(createExpansionsTree(), ['Horizons'])).toEqual({
        Expansions: 'indeterminate',
        Horizons: 'checked',
      });
    });

    it('converts full array model with shallow tree', () => {
      expect(
        transformArrToObj(createExpansionsTree(), [
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

    it('converts empty array model with nested tree', () => {
      expect(transformArrToObj(createAdversariesTree([]), [])).toEqual({});
    });

    it('converts partial array model with nested tree', () => {
      expect(
        transformArrToObj(createAdversariesTree([]), ['bp-0', 'sw-1'])
      ).toEqual({
        Adversaries: 'indeterminate',
        'Brandenburg-Prussia': 'indeterminate',
        Sweden: 'indeterminate',
        'bp-0': 'checked',
        'sw-1': 'checked',
      });
    });

    it('converts full array model with nested tree', () => {
      expect(
        transformArrToObj(createAdversariesTree([]), [
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
  });

  describe('transformObjToArr', () => {
    it('converts empty object model with shallow tree', () => {
      expect(transformObjToArr(createExpansionsTree(), {})).toEqual([]);
    });

    it('converts partial object model with shallow tree', () => {
      expect(
        transformObjToArr(createExpansionsTree(), {
          Expansions: 'indeterminate',
          Horizons: 'checked',
        })
      ).toEqual(['Horizons']);
    });

    it('converts full object model with shallow tree', () => {
      expect(
        transformObjToArr(createExpansionsTree(), {
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

    it('converts empty object model with nested tree', () => {
      expect(transformObjToArr(createAdversariesTree([]), {})).toEqual([]);
    });

    it('converts partial object model with nested tree', () => {
      expect(
        transformObjToArr(createAdversariesTree([]), {
          Adversaries: 'indeterminate',
          'Brandenburg-Prussia': 'indeterminate',
          Sweden: 'indeterminate',
          'bp-0': 'checked',
          'sw-1': 'checked',
        })
      ).toEqual(['bp-0', 'sw-1']);
    });

    it('converts full object model with nested tree', () => {
      expect(
        transformObjToArr(createAdversariesTree([]), {
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
});
