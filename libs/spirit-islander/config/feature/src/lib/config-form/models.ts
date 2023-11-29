import {
  SpiritName,
  BalancedBoardName,
  MapName,
  ScenarioName,
  AdversaryLevelId,
  Expansion,
  getAdversaries,
  getAdversaryLevelIds,
  getBoards,
  getMaps,
  getNames,
  getScenarios,
  getSpirits,
} from '@atocha/spirit-islander/shared/util';

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
    expansions: readonly Expansion[],
    target: 'Expansions' | Expansion
  ): Models {
    this._spiritNames = this._updateModel(
      (expansions) => getNames(getSpirits(expansions)),
      this._spiritNames,
      expansions,
      target
    );

    this._boardNames = this._updateModel(
      (expansions) => getNames(getBoards(expansions)),
      this._boardNames,
      expansions,
      target
    );

    this._mapNames = this._updateModel(
      (expansions) => getNames(getMaps(expansions)),
      this._mapNames,
      expansions,
      target
    );

    this._scenarioNames = this._updateModel(
      (expansions) => getNames(getScenarios(expansions)),
      this._scenarioNames,
      expansions,
      target
    );

    this._adversaryLevelIds = this._updateModel(
      (expansions) => getAdversaryLevelIds(getAdversaries(expansions)),
      this._adversaryLevelIds,
      expansions,
      target
    );

    return this;
  }

  private _updateModel<TName>(
    createModel: (expansions: readonly Expansion[]) => readonly TName[],
    existingModel: readonly TName[],
    expansions: readonly Expansion[],
    target: 'Expansions' | Expansion
  ): readonly TName[] {
    const allowedOptionNames = createModel(expansions);

    if (target === 'Expansions') {
      const expansionOptionNames = this._getExpansionOptionNames(
        createModel,
        expansions
      );
      return [
        ...existingModel.filter((name) => allowedOptionNames.includes(name)),
        ...expansionOptionNames.filter((name) => !existingModel.includes(name)),
      ];
    } else {
      const expansionOptionNames = this._getExpansionOptionNames(createModel, [
        target,
      ]);
      return expansions.includes(target)
        ? [...existingModel, ...expansionOptionNames]
        : existingModel.filter(
            (name) =>
              !expansionOptionNames.includes(name) &&
              allowedOptionNames.includes(name)
          );
    }
  }

  private _getExpansionOptionNames<TName>(
    createModel: (expansions: readonly Expansion[]) => readonly TName[],
    expansions: readonly Expansion[]
  ): readonly TName[] {
    const baseOptionNames = createModel([]);
    return createModel(expansions).filter(
      (name) => !baseOptionNames.includes(name)
    );
  }
}
