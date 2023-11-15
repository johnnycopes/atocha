import { ADVERSARIES, AdversaryLevelId } from './game/adversaries';
import { BOARDS } from './game/boards';
import { ExpansionName } from './game/expansions';
import { MAPS } from './game/maps';
import { SCENARIOS } from './game/scenarios';
import { SPIRITS } from './game/spirits';
import { getOptionsByExpansion } from './game/get-options';

export class Options {
  private _spirits = SPIRITS;
  get spirits() {
    return this._spirits;
  }
  get spiritNames() {
    return this._spirits.map(({ name }) => name);
  }

  private _boards = BOARDS;
  get boards() {
    return this._boards;
  }
  get boardNames() {
    return this._boards.map(({ name }) => name);
  }

  private _maps = MAPS;
  get maps() {
    return this._maps;
  }
  get mapNames() {
    return this._maps.map(({ name }) => name);
  }

  private _scenarios = SCENARIOS;
  get scenarios() {
    return this._scenarios;
  }
  get scenarioNames() {
    return this._scenarios.map(({ name }) => name);
  }

  private _adversaries = ADVERSARIES;
  get adversaries() {
    return this._adversaries;
  }
  get adversaryLevelIds() {
    return this._adversaries.reduce<AdversaryLevelId[]>((model, adversary) => {
      adversary.levels.forEach((level) => model.push(level.id));
      return model;
    }, []);
  }

  constructor(expansions?: ExpansionName[]) {
    this.update(expansions);
  }

  update(expansions?: ExpansionName[]): void {
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
