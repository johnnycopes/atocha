import { ExpansionName } from './game/expansions';

export class Updater {
  updateModel<TName>(
    createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
    existingModel: readonly TName[],
    expansions: readonly ExpansionName[],
    target: 'Expansions' | ExpansionName
  ): readonly TName[] {
    if (target === 'Expansions') {
      return this._recreateModel(createModel, existingModel, expansions);
    }
    if (expansions.includes(target)) {
      return this._augmentModel(createModel, existingModel, target);
    } else {
      return this._purgeModel(createModel, existingModel, target);
    }
  }

  private _recreateModel<TName>(
    createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
    existingModel: readonly TName[],
    expansions: readonly ExpansionName[]
  ): readonly TName[] {
    const expansionItemNames = this._getExpansionItemNames(
      createModel,
      expansions
    );
    const allowedItemNames = createModel(expansions);
    return [
      ...existingModel.filter((name) => allowedItemNames.includes(name)),
      ...expansionItemNames.filter((name) => !existingModel.includes(name)),
    ];
  }

  private _augmentModel<TName>(
    createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
    existingModel: readonly TName[],
    expansionToAdd: ExpansionName
  ): readonly TName[] {
    const expansionItemNames = this._getExpansionItemNames(createModel, [
      expansionToAdd,
    ]);
    return [...existingModel, ...expansionItemNames];
  }

  private _purgeModel<TName>(
    createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
    existingModel: readonly TName[],
    expansionToRemove: ExpansionName
  ): readonly TName[] {
    const expansionItemNames = this._getExpansionItemNames(createModel, [
      expansionToRemove,
    ]);
    return existingModel.filter((name) => !expansionItemNames.includes(name));
  }

  private _getExpansionItemNames<TName>(
    createModel: (expansions?: readonly ExpansionName[]) => readonly TName[],
    expansions: readonly ExpansionName[]
  ): readonly TName[] {
    const baseItemNames = createModel();
    return createModel(expansions).filter(
      (name) => !baseItemNames.includes(name)
    );
  }
}
