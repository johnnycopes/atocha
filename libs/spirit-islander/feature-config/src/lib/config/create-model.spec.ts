import { createExpansionsTree } from './create-tree';
import { createTreeModel } from './create-model';

describe('createModel', () => {
  it('converts empty array model to empty object model', () => {
    expect(createTreeModel(createExpansionsTree(), [])).toEqual({});
  });

  //  array model to object model of checkbox states
  // expect(createTreeModel(createExpansionsTree(), ['Horizons'])).toEqual({
  //   Expansions: 'indeterminate',
  //   Horizons: 'checked',
  // });
});
