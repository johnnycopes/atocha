import { State, MutableStates } from '../shared/types';
import { IdsTree } from './ids/ids';

export function updateStates<T>({
  states,
  ids,
  targetId,
}: {
  states: MutableStates;
  ids: IdsTree<T>;
  targetId: string;
}): void {
  const { ancestorIds, nodeAndDescendantIds } = ids.getConnectedIds(targetId);
  const shouldMarkChecked = states[targetId] !== 'checked';

  for (const id of nodeAndDescendantIds) {
    if (shouldMarkChecked) {
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
}
