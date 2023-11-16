import { ADVERSARIES, Adversary, AdversaryLevelId } from './adversaries';
import { BOARDS, BalancedBoardName, Board } from './boards';
import { EXPANSIONS, ExpansionName } from './expansions';
import { MAPS, Map, MapName } from './maps';
import { SCENARIOS, Scenario, ScenarioName } from './scenarios';
import { SPIRITS, Spirit, SpiritName } from './spirits';
import { DIFFICULTIES } from './difficulty';
import { PLAYERS } from './players';
import { Option } from './option';
import { getOptionsByExpansion } from './get-options-by-expansion';

export class Options {
  static allExpansions = EXPANSIONS;
  static allDifficulties = DIFFICULTIES;
  static allPlayers = PLAYERS;

  static allSpirits = SPIRITS;
  static allSpiritNames = getNames(this.allSpirits);
  static allBoards = BOARDS;
  static allBoardNames = getNames(this.allBoards);
  static allMaps = MAPS;
  static allMapNames = getNames(this.allMaps);
  static allScenarios = SCENARIOS;
  static allScenarioNames = getNames(this.allScenarios);
  static allAdversaries = ADVERSARIES;
  static allAdversaryLevelIds = getAdversaryLevelIds(this.allAdversaries);

  private _spirits = SPIRITS;
  get spirits(): readonly Spirit[] {
    return this._spirits;
  }
  get spiritNames(): readonly SpiritName[] {
    return getNames(this._spirits);
  }

  private _boards = BOARDS;
  get boards(): readonly Board[] {
    return this._boards;
  }
  get boardNames(): readonly BalancedBoardName[] {
    return getNames(this._boards);
  }

  private _maps = MAPS;
  get maps(): readonly Map[] {
    return this._maps;
  }
  get mapNames(): readonly MapName[] {
    return getNames(this._maps);
  }

  private _scenarios = SCENARIOS;
  get scenarios(): readonly Scenario[] {
    return this._scenarios;
  }
  get scenarioNames(): readonly ScenarioName[] {
    return getNames(this._scenarios);
  }

  private _adversaries = ADVERSARIES;
  get adversaries(): readonly Adversary[] {
    return this._adversaries;
  }
  get adversaryLevelIds(): readonly AdversaryLevelId[] {
    return getAdversaryLevelIds(this._adversaries);
  }

  constructor(expansions?: readonly ExpansionName[]) {
    this.update(expansions);
  }

  update(expansions?: readonly ExpansionName[]): void {
    this._spirits = expansions
      ? getOptionsByExpansion(SPIRITS, expansions)
      : SPIRITS;
    this._boards = expansions
      ? getOptionsByExpansion(BOARDS, expansions)
      : BOARDS;
    this._maps = expansions ? getOptionsByExpansion(MAPS, expansions) : MAPS;
    this._scenarios = expansions
      ? getOptionsByExpansion(SCENARIOS, expansions)
      : SCENARIOS;
    this._adversaries = expansions
      ? getOptionsByExpansion(ADVERSARIES, expansions)
      : ADVERSARIES;
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
