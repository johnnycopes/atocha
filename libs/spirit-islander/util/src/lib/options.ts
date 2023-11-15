import { ADVERSARIES } from './game/adversaries';
import { BOARDS } from './game/boards';
import { ExpansionName } from './game/expansions';
import { MAPS } from './game/maps';
import { SCENARIOS } from './game/scenarios';
import { SPIRITS } from './game/spirits';
import { getOptionsByExpansion } from './game/get-options';

export class Options {
  private _expansions: ExpansionName[] = [];
  get expansions(): readonly ExpansionName[] {
    return this._expansions;
  }

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
    this._expansions = expansions;
    this._spirits = getOptionsByExpansion(SPIRITS, this._expansions);
    this._boards = getOptionsByExpansion(BOARDS, this._expansions);
    this._maps = getOptionsByExpansion(MAPS, this._expansions);
    this._scenarios = getOptionsByExpansion(SCENARIOS, this._expansions);
    this._adversaries = getOptionsByExpansion(ADVERSARIES, this._expansions);
  }
}
