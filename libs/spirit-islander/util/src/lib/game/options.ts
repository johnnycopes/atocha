import {
  ADVERSARIES,
  BOARDS,
  DIFFICULTIES,
  EXPANSIONS,
  MAPS,
  PLAYERS,
  SCENARIOS,
  SPIRITS,
} from './data';
import { Adversary, AdversaryLevelId } from './adversaries';
import { BalancedBoardName, Board } from './boards';
import { Difficulty } from './difficulty';
import { ExpansionName } from './expansions';
import { Map, MapName } from './maps';
import { Players } from './players';
import { Scenario, ScenarioName } from './scenarios';
import { Spirit, SpiritName } from './spirits';

import { Option } from './option';
import { getOptionsByExpansion } from './get-options-by-expansion';

export class Options {
  static allExpansions: readonly ExpansionName[] = EXPANSIONS;
  static allDifficulties: readonly Difficulty[] = DIFFICULTIES;
  static allPlayers: readonly Players[] = PLAYERS;
  static allSpirits: readonly Spirit[] = SPIRITS;
  static allBoards: readonly Board[] = BOARDS;
  static allMaps: readonly Map[] = MAPS;
  static allScenarios: readonly Scenario[] = SCENARIOS;
  static allAdversaries: readonly Adversary[] = ADVERSARIES;

  static allSpiritNames = getNames(this.allSpirits);
  static allBoardNames = getNames(this.allBoards);
  static allMapNames = getNames(this.allMaps);
  static allScenarioNames = getNames(this.allScenarios);
  static allAdversaryLevelIds = getAdversaryLevelIds(this.allAdversaries);

  private _spirits: readonly Spirit[] = SPIRITS;
  get spirits() {
    return this._spirits;
  }
  get spiritNames(): readonly SpiritName[] {
    return getNames(this._spirits);
  }

  private _boards: readonly Board[] = BOARDS;
  get boards() {
    return this._boards;
  }
  get boardNames(): readonly BalancedBoardName[] {
    return getNames(this._boards);
  }

  private _maps: readonly Map[] = MAPS;
  get maps() {
    return this._maps;
  }
  get mapNames(): readonly MapName[] {
    return getNames(this._maps);
  }

  private _scenarios: readonly Scenario[] = SCENARIOS;
  get scenarios() {
    return this._scenarios;
  }
  get scenarioNames(): readonly ScenarioName[] {
    return getNames(this._scenarios);
  }

  private _adversaries: readonly Adversary[] = ADVERSARIES;
  get adversaries() {
    return this._adversaries;
  }
  get adversaryLevelIds(): readonly AdversaryLevelId[] {
    return getAdversaryLevelIds(this._adversaries);
  }

  constructor(expansions: readonly ExpansionName[]) {
    this.update(expansions);
  }

  update(expansions: readonly ExpansionName[]): void {
    this._spirits = getOptionsByExpansion(Options.allSpirits, expansions);
    this._boards = getOptionsByExpansion(Options.allBoards, expansions);
    this._maps = getOptionsByExpansion(Options.allMaps, expansions);
    this._scenarios = getOptionsByExpansion(Options.allScenarios, expansions);
    this._adversaries = getOptionsByExpansion(
      Options.allAdversaries,
      expansions
    );
  }
}

function getNames<TName extends string>(options: readonly Option<TName>[]) {
  return options.map(({ name }) => name);
}

function getAdversaryLevelIds(adversaries: readonly Adversary[]) {
  return adversaries.reduce<AdversaryLevelId[]>((model, adversary) => {
    adversary.levels.forEach((level) => model.push(level.id));
    return model;
  }, []);
}
