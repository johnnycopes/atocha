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
  getAdversaries,
  getAdversaryLevelIds,
  getBoards,
  getExpansions,
  getMaps,
  getNames,
  getScenarios,
  getSpirits,
} from '@atocha/spirit-islander/shared/util';
import { Settings } from '@atocha/spirit-islander/settings/util';

export interface AppState {
  config: Config;
  gameSetup: GameSetup | undefined;
  settings: Settings;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly _oldConfigKey = 'CONFIG_NEW';
  private readonly _configKey = 'CONFIG';
  private readonly _settingsKey = 'SETTINGS';
  private _config: Config = this._getConfig();
  private _settings: Settings = this._getSettings();
  private _state = new State<AppState>({
    config: this._config,
    gameSetup: createGameSetup(this._config),
    settings: this._settings,
  });

  state$ = this._state.get().pipe(
    tap(({ config, settings }) => {
      this._setConfig(config);
      this._setSettings(settings);
    })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updateConfig(config: Config): void {
    this._state.updateProp('config', config);
    this._state.updateProp('gameSetup', createGameSetup(config));
  }

  updateSettings(changes: Partial<Settings>): void {
    this._state.transformProp('settings', (settings) => ({
      ...settings,
      ...changes,
    }));
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
    const oldConfig = this._localStorageService.getItem(this._oldConfigKey);
    const config =
      oldConfig || this._localStorageService.getItem(this._configKey);

    if (oldConfig) {
      this._localStorageService.removeItem(this._oldConfigKey);
    }

    return config
      ? JSON.parse(migrateConfig(config))
      : {
          expansions: getExpansions(),
          players: 5,
          difficultyRange: [0, 8],
          spiritNames: getNames(getSpirits()),
          mapNames: getNames(getMaps()),
          boardNames: getNames(getBoards()),
          scenarioNames: getNames(getScenarios()),
          adversaryLevelIds: getAdversaryLevelIds(getAdversaries()),
        };
  }

  private _getSettings(): Settings {
    const settings = this._localStorageService.getItem(this._settingsKey);
    return settings
      ? JSON.parse(settings)
      : { randomizedThematicBoards: false };
  }

  private _setConfig(config: Config): void {
    this._localStorageService.setItem(this._configKey, JSON.stringify(config));
  }

  private _setSettings(settings: Settings): void {
    this._localStorageService.setItem(
      this._settingsKey,
      JSON.stringify(settings)
    );
  }
}
