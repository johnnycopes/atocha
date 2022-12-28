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

  //   it('converts partial array model with nested tree', () => {
  //     expect(
  //       createTreeModel(createAdversariesTree([]), ['bp-0', 'sw-1'])
  //     ).toEqual({
  //       Adversaries: 'indeterminate',
  //       'Brandenburg-Prussia': 'indeterminate',
  //       Sweden: 'indeterminate',
  //       'bp-0': 'checked',
  //       'sw-1': 'checked',
  //     });
  //   });
});
