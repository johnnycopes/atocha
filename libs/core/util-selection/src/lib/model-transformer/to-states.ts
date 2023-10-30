import { Ids } from './ids';
import { SelectionModel, SelectionStates } from './types';

export function toStates<T>(
  model: SelectionModel,
  ids: Ids<T>
): SelectionStates {
  const states: SelectionStates = {};
  const idsModel = Array.isArray(model) ? new Set(model) : model;

  /*
    Iterating through the IDs backwards builds up `states` from the leaf nodes
    of the tree up towards the root. The code is procedural and highly depends
    on this order but is more performant since each node reliably knows the state
    of all of its children.
  */
  for (let i = ids.descending.length - 1; i >= 0; i--) {
    const id = ids.descending[i];
    if (idsModel.has(id)) {
      states[id] = 'checked';
    } else {
      const childrenIds = ids.map.get(id)?.childrenIds ?? [];
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
