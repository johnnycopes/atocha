import { Injectable } from '@angular/core';

import { State } from '@atocha/core/util';
import {
  Combo,
  Config,
  createAdversariesModel,
  createBoardsModel,
  createGameSetup,
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
  ExpansionName,
  GameSetup,
  getValidCombos,
  Page,
} from '@atocha/spirit-islander/util';
import { first } from 'rxjs';

interface AppState {
  page: Page;
  config: Config;
  validCombos: Combo[] | undefined;
  gameSetup: GameSetup | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _expansions: ExpansionName[] = [
    'Horizons',
    'Jagged Earth',
    'Branch & Claw',
    'Promo Pack 1',
    'Promo Pack 2',
  ];
  private _config: Config = {
    expansions: this._expansions,
    players: 5,
    difficultyRange: [0, 8],
    spiritNames: createSpiritsModel(this._expansions),
    mapNames: createMapsModel(['Horizons']),
    boardNames: createBoardsModel(this._expansions),
    scenarioNames: createScenariosModel(this._expansions),
    adversaryNamesAndIds: createAdversariesModel(this._expansions),
  };
  private _state = new State<AppState>({
    page: Page.Config,
    config: this._config,
    validCombos: undefined,
    gameSetup: createGameSetup(this._config, getValidCombos(this._config)),
  });

  state$ = this._state.get();

  edit(): void {
    this._state.updateProp('page', Page.Config);
  }

  generate(config: Config, validCombos: Combo[]): void {
    this._state.updateProp('config', config);
    this._state.updateProp('validCombos', validCombos);
    this._state.updateProp('gameSetup', createGameSetup(config, validCombos));
    this._state.updateProp('page', Page.GameSetup);
  }

  regenerate(): void {
    this._state
      .get()
      .pipe(first())
      .subscribe(({ config, validCombos }) =>
        this._state.updateProp(
          'gameSetup',
          createGameSetup(config, validCombos ?? [])
        )
      );
  }
}
