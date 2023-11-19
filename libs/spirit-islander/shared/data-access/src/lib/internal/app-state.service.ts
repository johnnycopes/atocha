import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { LocalStorageService, State } from '@atocha/core/data-access';
import { Options } from '@atocha/spirit-islander/shared/util';
import { Config } from '@atocha/spirit-islander/config/util';
import {
  GameSetup,
  createGameSetup,
} from '@atocha/spirit-islander/game-setup/util';
import { migrateConfig } from './app-migration';

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
          expansions: Options.allExpansions,
          players: 5,
          difficultyRange: [0, 8],
          spiritNames: Options.getNames(Options.allSpirits),
          mapNames: Options.getNames(Options.allMaps),
          boardNames: Options.getNames(Options.allBoards),
          scenarioNames: Options.getNames(Options.allScenarios),
          adversaryLevelIds: Options.getAdversaryLevelIds(
            Options.allAdversaries
          ),
        };
  }

  private _setConfig(config: Config): void {
    this._localStorageService.setItem(this._key, JSON.stringify(config));
  }
}
