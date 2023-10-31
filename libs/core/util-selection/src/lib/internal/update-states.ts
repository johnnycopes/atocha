import { Ids } from './ids';
import { State, States } from './types';

export function updateStates<T>(
  checked: boolean,
  id: string,
  states: States,
  ids: Ids<T>
): States {
  const { ancestorIds, itemAndDescendantsIds } = ids.getConnectedIds(id);

  for (const id of itemAndDescendantsIds) {
    if (checked) {
      states[id] = 'checked';
    } else {
      delete states[id];
    }
  }

  for (const ancestorId of ancestorIds) {
    const ancestorChildrenIds = ids.getChildrenIds(ancestorId);
    const ancestorChildrenStates: Record<State, number> = {
      checked: 0,
      indeterminate: 0,
    };

    for (const childId of ancestorChildrenIds) {
      const childState = states[childId];
      if (childState) {
        ancestorChildrenStates[childState]++;
      }
    }

    if (ancestorChildrenStates.checked === ancestorChildrenIds.length) {
      states[ancestorId] = 'checked';
    } else if (
      ancestorChildrenStates.checked > 0 ||
      ancestorChildrenStates.indeterminate > 0
    ) {
      states[ancestorId] = 'indeterminate';
    } else {
      delete states[ancestorId];
    }
  }

  return states;
}
