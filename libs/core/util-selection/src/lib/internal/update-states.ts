import { Ids } from './ids';
import { SelectionState, SelectionStates } from './types';

export function updateStates<T>(
  checked: boolean,
  id: string,
  states: SelectionStates,
  ids: Ids<T>
): SelectionStates {
  const { ancestorIds, itemAndDescendantsIds } = ids.getConnectedIds(id);

  for (const id of itemAndDescendantsIds) {
    if (checked) {
      states[id] = 'checked';
    } else {
      delete states[id];
    }
  }

  for (const ancestorId of ancestorIds) {
    const ancestorChildrenIds = ids.map.get(ancestorId)?.childrenIds ?? [];
    const ancestorChildrenStates: Record<SelectionState, number> = {
      checked: 0,
      indeterminate: 0,
    };

    ancestorChildrenIds.forEach((childId) => {
      const childState = states[childId];
      if (states[childId]) {
        ancestorChildrenStates[childState]++;
      }
    });

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
