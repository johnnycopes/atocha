import { ADVERSARIES, Adversary, AdversaryLevelId } from './game/adversaries';
import { BOARDS, BalancedBoardName, Board } from './game/boards';
import { ExpansionName } from './game/expansions';
import { MAPS, Map, MapName } from './game/maps';
import { SCENARIOS, Scenario, ScenarioName } from './game/scenarios';
import { SPIRITS, Spirit, SpiritName } from './game/spirits';
import { getOptionsByExpansion } from './game/get-options';

export class Options {
  private _spirits = SPIRITS;
  get spirits(): readonly Spirit[] {
    return this._spirits;
  }
  get spiritNames(): readonly SpiritName[] {
    return this._spirits.map(({ name }) => name);
  }

  private _boards = BOARDS;
  get boards(): readonly Board[] {
    return this._boards;
  }
  get boardNames(): readonly BalancedBoardName[] {
    return this._boards.map(({ name }) => name);
  }

  private _maps = MAPS;
  get maps(): readonly Map[] {
    return this._maps;
  }
  get mapNames(): readonly MapName[] {
    return this._maps.map(({ name }) => name);
  }

  private _scenarios = SCENARIOS;
  get scenarios(): readonly Scenario[] {
    return this._scenarios;
  }
  get scenarioNames(): readonly ScenarioName[] {
    return this._scenarios.map(({ name }) => name);
  }

  private _adversaries = ADVERSARIES;
  get adversaries(): readonly Adversary[] {
    return this._adversaries;
  }
  get adversaryLevelIds(): readonly AdversaryLevelId[] {
    return this._adversaries.reduce<AdversaryLevelId[]>((model, adversary) => {
      adversary.levels.forEach((level) => model.push(level.id));
      return model;
    }, []);
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
