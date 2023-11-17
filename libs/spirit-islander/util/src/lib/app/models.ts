import { AdversaryLevelId } from '../game/adversaries';
import { BalancedBoardName } from '../game/boards';
import { ExpansionName } from '../game/expansions';
import { getOptionsByExpansion } from '../game/get-options-by-expansion';
import { MapName } from '../game/maps';
import { Options } from '../game/options';
import { ScenarioName } from '../game/scenarios';
import { SpiritName } from '../game/spirits';

export class Models {
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
  ): Models {
    this._spiritNames = this._updateModel(
      (expansions) =>
        getOptionsByExpansion(Options.allSpirits, expansions).map(
          (option) => option.name
        ),
      this._spiritNames,
      expansions,
      target
    );

    this._boardNames = this._updateModel(
      (expansions) =>
        getOptionsByExpansion(Options.allBoards, expansions).map(
          (option) => option.name
        ),
      this._boardNames,
      expansions,
      target
    );

    this._mapNames = this._updateModel(
      (expansions) =>
        getOptionsByExpansion(Options.allMaps, expansions).map(
          (option) => option.name
        ),
      this._mapNames,
      expansions,
      target
    );

    this._scenarioNames = this._updateModel(
      (expansions) =>
        getOptionsByExpansion(Options.allScenarios, expansions).map(
          (option) => option.name
        ),
      this._scenarioNames,
      expansions,
      target
    );

    this._adversaryLevelIds = this._updateModel(
      (expansions) =>
        getOptionsByExpansion(Options.allAdversaries, expansions).reduce<
          AdversaryLevelId[]
        >((model, adversary) => {
          adversary.levels.forEach((level) => model.push(level.id));
          return model;
        }, []),
      this._adversaryLevelIds,
      expansions,
      target
    );

    return this;
  }

  private _updateModel<TName>(
    createModel: (expansions: readonly ExpansionName[]) => readonly TName[],
    existingModel: readonly TName[],
    expansions: readonly ExpansionName[],
    target: 'Expansions' | ExpansionName
  ): readonly TName[] {
    if (target === 'Expansions') {
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

    const expansionItemNames = this._getExpansionItemNames(createModel, [
      target,
    ]);
    return expansions.includes(target)
      ? [...existingModel, ...expansionItemNames]
      : existingModel.filter((name) => !expansionItemNames.includes(name));
  }

  private _getExpansionItemNames<TName>(
    createModel: (expansions: readonly ExpansionName[]) => readonly TName[],
    expansions: readonly ExpansionName[]
  ): readonly TName[] {
    const baseItemNames = createModel([]);
    return createModel(expansions).filter(
      (name) => !baseItemNames.includes(name)
    );
  }
}
