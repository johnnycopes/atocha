import { AdversaryLevelId } from '../game/adversaries';
import { BalancedBoardName } from '../game/boards';
import { ExpansionName } from '../game/expansions';
import { MapName } from '../game/maps';
import { ScenarioName } from '../game/scenarios';
import { SpiritName } from '../game/spirits';
import {
  createAdversariesModel,
  createBoardsModel,
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
} from './create-model';

export class Updater {
  private _spiritNames: readonly SpiritName[] = [];
  get spiritNames() {
    return this._spiritNames;
  }

  private _boardNames: readonly BalancedBoardName[] = [];
  get boardNames() {
    return this._boardNames;
  }

  private _mapNames: readonly MapName[] = [];
  get mapNames() {
    return this._mapNames;
  }

  private _scenarioNames: readonly ScenarioName[] = [];
  get scenarioNames() {
    return this._scenarioNames;
  }

  private _adversaryLevelIds: readonly AdversaryLevelId[] = [];
  get adversaryLevelIds() {
    return this._adversaryLevelIds;
  }

  constructor({
    spiritNames,
    boardNames,
    mapNames,
    scenarioNames,
    adversaryLevelIds,
  }: {
    spiritNames?: readonly SpiritName[];
    boardNames?: readonly BalancedBoardName[];
    mapNames?: readonly MapName[];
    scenarioNames?: readonly ScenarioName[];
    adversaryLevelIds?: readonly AdversaryLevelId[];
  } = {}) {
    this._spiritNames = spiritNames ?? [];
    this._boardNames = boardNames ?? [];
    this._mapNames = mapNames ?? [];
    this._scenarioNames = scenarioNames ?? [];
    this._adversaryLevelIds = adversaryLevelIds ?? [];
  }

  update(
    expansions: readonly ExpansionName[],
    target: 'Expansions' | ExpansionName
  ): Updater {
    this._spiritNames = this._updateModel(
      createSpiritsModel,
      this._spiritNames,
      expansions,
      target
    );

    this._boardNames = this._updateModel(
      createBoardsModel,
      this._boardNames,
      expansions,
      target
    );

    this._mapNames = this._updateModel(
      createMapsModel,
      this._mapNames,
      expansions,
      target
    );

    this._scenarioNames = this._updateModel(
      createScenariosModel,
      this._scenarioNames,
      expansions,
      target
    );

    this._adversaryLevelIds = this._updateModel(
      createAdversariesModel,
      this._adversaryLevelIds,
      expansions,
      target
    );

    return this;
  }

  _updateModel<TName>(
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
