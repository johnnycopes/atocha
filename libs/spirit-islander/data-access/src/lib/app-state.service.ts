import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
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
  EXPANSIONS,
  GameSetup,
  getValidCombos,
  Page,
} from '@atocha/spirit-islander/util';

interface AppState {
  page: Page;
  config: Config;
  validCombos: Combo[] | undefined;
  gameSetup: GameSetup | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly _key = 'CONFIG';
  private _config: Config = this._getConfig();
  private _state = new State<AppState>({
    page: Page.Config,
    config: this._config,
    validCombos: undefined,
    gameSetup: createGameSetup(this._config, getValidCombos(this._config)),
  });

  state$ = this._state.get().pipe(tap(({ config }) => this._setConfig(config)));

  constructor(private _localStorageService: LocalStorageService) {}

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

  private _getConfig(): Config {
    const config = this._localStorageService.getItem(this._key);
    const expansions = EXPANSIONS.slice();
    return config
      ? JSON.parse(config)
      : {
          expansions: expansions,
          players: 5,
          difficultyRange: [0, 8],
          spiritNames: createSpiritsModel(expansions),
          mapNames: createMapsModel(expansions),
          boardNames: createBoardsModel(expansions),
          scenarioNames: createScenariosModel(expansions),
          adversaryLevelIds: createAdversariesModel(expansions),
        };
  }

  private _setConfig(config: Config): void {
    this._localStorageService.setItem(this._key, JSON.stringify(config));
  }
}
