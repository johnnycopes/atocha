import { reduceRecursively } from './reduce-recursively';
import { Ids } from './ids';
import { SelectionState, SelectionStates } from './types';

export function updateStates<T>(
  checked: boolean,
  id: string,
  states: SelectionStates,
  ids: Ids<T>
): SelectionStates {
  let updatedStates = updateItemAndDescendantStates({
    id,
    checked,
    states,
    ids,
  });
  updatedStates = updateAncestorStates(id, updatedStates, ids);
  return updatedStates;
}

function updateItemAndDescendantStates<T>({
  id,
  checked,
  states,
  ids,
}: {
  id: string;
  checked: boolean;
  states: SelectionStates;
  ids: Ids<T>;
}): SelectionStates {
  const itemAndDescendantsIds = reduceRecursively<string, string[]>({
    item: id,
    getItems: (id: string) => ids.map.get(id)?.childrenIds ?? [],
    initialValue: [],
    reducer: (accum, curr) => {
      accum.push(curr);
      return accum;
    },
  });

  itemAndDescendantsIds.forEach((id) => {
    if (checked) {
      states[id] = 'checked';
    } else {
      delete states[id];
    }
  });

  return states;
}

function updateAncestorStates<T>(
  id: string,
  states: SelectionStates,
  ids: Ids<T>
): SelectionStates {
  const ancestorIds = reduceRecursively<string, string[]>({
    item: id,
    getItems: (id) => {
      const parentId = ids.map.get(id)?.parentId;
      return parentId ? [parentId] : [];
    },
    initialValue: [],
    reducer: (accum, curr) => {
      if (id === curr) return accum;
      accum.push(curr);
      return accum;
    },
  });

  ancestorIds.forEach((ancestorId) => {
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
  });

  return states;
}
