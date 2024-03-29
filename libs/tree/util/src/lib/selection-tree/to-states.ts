import { Ids, States } from '../shared/types';
import { IdsTree } from './ids/ids-tree';

export function toStates<T>(ids: Ids, tree: IdsTree<T>): States {
  const states: States = {};
  const idsSet: ReadonlySet<string> = new Set(ids);

  /*
    Iterating through the IDs backwards builds up `states` from the leaves of
    the tree up towards the root. This approach is more performant since each node
    reliably knows the state of all of its children up front.
  */
  for (const id of tree.ascendingIds) {
    if (idsSet.has(id)) {
      states[id] = 'checked';
    } else {
      const childrenIds = tree.getChildrenIds(id);
      if (childrenIds.length) {
        const idsInStates = childrenIds.reduce(
          (total, id) => total + (states[id] ? 1 : 0),
          0
        );
        const totalIds = childrenIds.length;

        if (totalIds === 1 && states[childrenIds[0]] === 'indeterminate') {
          states[id] = 'indeterminate';
        } else if (totalIds === idsInStates) {
          states[id] = 'checked';
        } else if (idsInStates > 0) {
          states[id] = 'indeterminate';
        }
      }
    }
  }

  return states;
}
