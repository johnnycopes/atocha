import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { LocalStorageService, State } from '@atocha/core/data-access';
import { Config } from '@atocha/spirit-islander/config/util';
import {
  GameSetup,
  createGameSetup,
} from '@atocha/spirit-islander/game-setup/util';
import { migrateConfig } from './app-migration';
import {
  ADVERSARIES,
  BOARDS,
  EXPANSIONS,
  MAPS,
  SCENARIOS,
  SPIRITS,
  getAdversaryLevelIds,
  getNames,
} from '@atocha/spirit-islander/shared/util';

export interface AppState {
  config: Config;
  gameSetup: GameSetup | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly _oldKey = 'CONFIG_NEW';
  private readonly _key = 'CONFIG';
  private _config: Config = this._getConfig();
  private _state = new State<AppState>({
    config: this._config,
    gameSetup: createGameSetup(this._config),
  });

  state$ = this._state.get().pipe(tap(({ config }) => this._setConfig(config)));

  constructor(private _localStorageService: LocalStorageService) {}

  updateState(config: Config): void {
    this._state.updateProp('config', config);
    this._state.updateProp('gameSetup', createGameSetup(config));
  }

  refreshGameSetup(): void {
    this._state
      .get()
      .pipe(first())
      .subscribe(({ config }) =>
        this._state.updateProp('gameSetup', createGameSetup(config))
      );
  }

  private _getConfig(): Config {
    const oldConfig = this._localStorageService.getItem(this._oldKey);
    const config = oldConfig || this._localStorageService.getItem(this._key);

    if (oldConfig) {
      this._localStorageService.removeItem(this._oldKey);
    }

    return config
      ? JSON.parse(migrateConfig(config))
      : {
          expansions: EXPANSIONS,
          players: 5,
          difficultyRange: [0, 8],
          spiritNames: getNames(SPIRITS),
          mapNames: getNames(MAPS),
          boardNames: getNames(BOARDS),
          scenarioNames: getNames(SCENARIOS),
          adversaryLevelIds: getAdversaryLevelIds(ADVERSARIES),
        };
  }

  private _setConfig(config: Config): void {
    this._localStorageService.setItem(this._key, JSON.stringify(config));
  }
}
