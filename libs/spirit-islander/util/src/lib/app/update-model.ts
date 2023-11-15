import type { ExpansionName } from '../game/expansions';

export function updateModel<TName>(
  createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
  existingModel: readonly TName[],
  expansions: readonly ExpansionName[],
  target: 'Expansions' | ExpansionName
): readonly TName[] {
  if (target === 'Expansions') {
    return recreateModel(createModel, existingModel, expansions);
  }
  if (expansions.includes(target)) {
    return augmentModel(createModel, existingModel, target);
  } else {
    return purgeModel(createModel, existingModel, target);
  }
}

function recreateModel<TName>(
  createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
  existingModel: readonly TName[],
  expansions: readonly ExpansionName[]
): readonly TName[] {
  const expansionItemNames = getExpansionItemNames(createModel, expansions);
  const allowedItemNames = createModel(expansions);
  return [
    ...existingModel.filter((name) => allowedItemNames.includes(name)),
    ...expansionItemNames.filter((name) => !existingModel.includes(name)),
  ];
}

function augmentModel<TName>(
  createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
  existingModel: readonly TName[],
  expansionToAdd: ExpansionName
): readonly TName[] {
  const expansionItemNames = getExpansionItemNames(createModel, [
    expansionToAdd,
  ]);
  return [...existingModel, ...expansionItemNames];
}

function purgeModel<TName>(
  createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
  existingModel: readonly TName[],
  expansionToRemove: ExpansionName
): readonly TName[] {
  const expansionItemNames = getExpansionItemNames(createModel, [
    expansionToRemove,
  ]);
  return existingModel.filter((name) => !expansionItemNames.includes(name));
}

function getExpansionItemNames<TName>(
  createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
  expansions: readonly ExpansionName[]
): readonly TName[] {
  const baseItemNames = createModel();
  return createModel(expansions).filter(
    (name) => !baseItemNames.includes(name)
  );
}
