import { Model, MutableStates, isArrayModel } from '../shared/types';
import { IdsTree } from './ids/ids';

export function toStates<T>(model: Model, ids: IdsTree<T>): MutableStates {
  const states: MutableStates = {};
  const idsModel = isArrayModel(model) ? new Set(model) : model;

  /*
    Iterating through the IDs backwards builds up `states` from the leaves of
    the tree up towards the root. This approach is more performant since each node
    reliably knows the state of all of its children up front.
  */
  for (const id of ids.ascending) {
    if (idsModel.has(id)) {
      states[id] = 'checked';
    } else {
      const childrenIds = ids.getChildrenIds(id);
      if (childrenIds.length) {
        const idsInState = childrenIds.reduce(
          (total, id) => total + (states[id] ? 1 : 0),
          0
        );
        const totalIds = childrenIds.length;

        if (totalIds === 1 && states[childrenIds[0]] === 'indeterminate') {
          states[id] = 'indeterminate';
        } else if (totalIds === idsInState) {
          states[id] = 'checked';
        } else if (idsInState > 0) {
          states[id] = 'indeterminate';
        }
      }
    }
  }

  return states;
}
