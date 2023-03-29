import { Injectable } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
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
  migrateConfig,
} from '@atocha/spirit-islander/util';
import { mapConfigToQueryParams, mapParamMapToConfig } from './routing';

interface AppState {
  config: Config;
  validCombos: Combo[] | undefined;
  gameSetup: GameSetup | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly _oldKey = 'CONFIG_NEW';
  private readonly _key = 'CONFIG';
  private _config: Config = this._getConfig(); // TODO: consider initializing _state in the constructor so this _config doesn't have to be a long-lived class member
  private _state = new State<AppState>({
    config: this._config,
    validCombos: undefined,
    gameSetup: createGameSetup(this._config, getValidCombos(this._config)),
  });

  state$ = this._state.get().pipe(tap(({ config }) => this._setConfig(config)));

  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {}

  navigateToGameSetup(config: Config): void {
    this._router.navigate(['game-setup'], {
      queryParams: mapConfigToQueryParams(config),
    });
  }

  navigateToConfig(): void {
    this._router.navigate(['config']);
  }

  processParams(params: ParamMap): void {
    try {
      const config = mapParamMapToConfig(params);
      const validCombos = getValidCombos(config);

      this._state.updateProp('config', config);
      this._state.updateProp('validCombos', getValidCombos(config));
      this._state.updateProp('gameSetup', createGameSetup(config, validCombos));
    } catch {
      this._router.navigate(['error'], {
        skipLocationChange: true,
        queryParamsHandling: 'preserve',
      });
    }
  }

  createNewGameSetup(): void {
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
    const oldConfig = this._localStorageService.getItem(this._oldKey);
    const config = oldConfig || this._localStorageService.getItem(this._key);

    if (oldConfig) {
      this._localStorageService.removeItem(this._oldKey);
    }

    const expansions = EXPANSIONS.slice();
    return config
      ? JSON.parse(migrateConfig(config))
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
