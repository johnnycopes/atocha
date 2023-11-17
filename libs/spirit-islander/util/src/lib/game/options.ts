import {
  EXPANSIONS,
  DIFFICULTIES,
  PLAYERS,
  SPIRITS,
  BOARDS,
  MAPS,
  SCENARIOS,
  ADVERSARIES,
} from './data';
import { Adversary, AdversaryLevelId } from './adversaries';
import { BalancedBoardName, Board } from './boards';
import { ExpansionName } from './expansions';
import { Map, MapName } from './maps';
import { Scenario, ScenarioName } from './scenarios';
import { Spirit, SpiritName } from './spirits';
import { Option } from './option';
import { getOptionsByExpansion } from './get-options-by-expansion';

export class Options {
  static allExpansions = EXPANSIONS;
  static allDifficulties = DIFFICULTIES;
  static allPlayers = PLAYERS;
  static allSpirits: readonly Spirit[] = SPIRITS;
  static allBoards: readonly Board[] = BOARDS;
  static allMaps: readonly Map[] = MAPS;
  static allScenarios: readonly Scenario[] = SCENARIOS;
  static allAdversaries: readonly Adversary[] = ADVERSARIES;

  static allSpiritNames: readonly SpiritName[] = getNames(this.allSpirits);
  static allBoardNames: readonly BalancedBoardName[] = getNames(BOARDS);
  static allMapNames: readonly MapName[] = getNames(MAPS);
  static allScenarioNames: readonly ScenarioName[] = getNames(SCENARIOS);
  static allAdversaryLevelIds: readonly AdversaryLevelId[] =
    getAdversaryLevelIds(this.allAdversaries);

  private _spirits: readonly Spirit[] = SPIRITS;
  get spirits() {
    return this._spirits;
  }
  get spiritNames(): readonly SpiritName[] {
    return this._spirits.map(({ name }) => name);
  }

  private _boards: readonly Board[] = BOARDS;
  get boards() {
    return this._boards;
  }
  get boardNames(): readonly BalancedBoardName[] {
    return this._boards.map(({ name }) => name);
  }

  private _maps: readonly Map[] = MAPS;
  get maps() {
    return this._maps;
  }
  get mapNames(): readonly MapName[] {
    return this._maps.map(({ name }) => name);
  }

  private _scenarios: readonly Scenario[] = SCENARIOS;
  get scenarios() {
    return this._scenarios;
  }
  get scenarioNames(): readonly ScenarioName[] {
    return this._scenarios.map(({ name }) => name);
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

function getNames<TName extends string, TOption extends Option<TName>>(
  options: readonly TOption[]
) {
  return options.map(({ name }) => name);
}

function getAdversaryLevelIds(adversaries: readonly Adversary[]) {
  return adversaries.reduce<AdversaryLevelId[]>((model, adversary) => {
    adversary.levels.forEach((level) => model.push(level.id));
    return model;
  }, []);
}
