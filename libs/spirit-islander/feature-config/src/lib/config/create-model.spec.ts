import { createAdversariesTree, createExpansionsTree } from './create-tree';
import { createTreeModel } from './create-model';

describe('createModel', () => {
  it('converts empty array model with shallow tree', () => {
    expect(createTreeModel(createExpansionsTree(), [])).toEqual({});
  });

  it('converts partial array model with shallow tree', () => {
    expect(createTreeModel(createExpansionsTree(), ['Horizons'])).toEqual({
      Expansions: 'indeterminate',
      Horizons: 'checked',
    });
  });

  it('converts full array model with shallow tree', () => {
    expect(
      createTreeModel(createExpansionsTree(), [
        'Horizons',
        'Branch & Claw',
        'Jagged Earth',
        'Promo Pack 1',
        'Promo Pack 2',
      ])
    ).toEqual({
      Expansions: 'checked',
      Horizons: 'checked',
      'Branch & Claw': 'checked',
      'Jagged Earth': 'checked',
      'Promo Pack 1': 'checked',
      'Promo Pack 2': 'checked',
    });
  });

  it('converts empty array model with nested tree', () => {
    expect(createTreeModel(createAdversariesTree([]), [])).toEqual({});
  });

  it('converts partial array model with nested tree', () => {
    expect(
      createTreeModel(createAdversariesTree([]), ['bp-0', 'sw-1'])
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
      createTreeModel(createAdversariesTree([]), [
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
