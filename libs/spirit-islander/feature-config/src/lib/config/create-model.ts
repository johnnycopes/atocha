import { CheckboxState } from '@atocha/core/ui';
import { ConfigTree } from './create-tree';

export function createTreeModel<T>(
  tree: ConfigTree<T>,
  model: string[]
): Record<string, CheckboxState> {
  const state: Record<string, CheckboxState> = {};

  // if (model.length === this._items.length) {
  //   state[this.name] = 'checked';
  // } else if (model.length > 0) {
  //   state[this.name] = 'indeterminate';
  // }

  return model.reduce((accum, curr) => {
    accum[curr] = 'checked';
    return accum;
  }, state);
}
