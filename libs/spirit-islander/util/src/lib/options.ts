import { ADVERSARIES } from './game/adversaries';
import { BOARDS } from './game/boards';
import { EXPANSIONS, ExpansionName } from './game/expansions';
import { MAPS } from './game/maps';
import { SCENARIOS } from './game/scenarios';
import { SPIRITS } from './game/spirits';
import { getOptionsByExpansion } from './game/get-options';

export class Options {
  readonly expansions = EXPANSIONS;

  private _spirits = SPIRITS;
  get spirits() {
    return this._spirits;
  }

  private _boards = BOARDS;
  get boards() {
    return this._boards;
  }

  private _maps = MAPS;
  get maps() {
    return this._maps;
  }

  private _scenarios = SCENARIOS;
  get scenarios() {
    return this._scenarios;
  }

  private _adversaries = ADVERSARIES;
  get adversaries() {
    return this._adversaries;
  }

  constructor(expansions: ExpansionName[] = []) {
    this.update(expansions);
  }

  update(expansions: ExpansionName[]): void {
    this._spirits = getOptionsByExpansion(SPIRITS, expansions);
    this._boards = getOptionsByExpansion(BOARDS, expansions);
    this._maps = getOptionsByExpansion(MAPS, expansions);
    this._scenarios = getOptionsByExpansion(SCENARIOS, expansions);
    this._adversaries = getOptionsByExpansion(ADVERSARIES, expansions);
  }
}
