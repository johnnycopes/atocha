import { Injectable } from '@angular/core';
import { Observable, first, map, tap } from 'rxjs';

import { LocalStorageService, State } from '@atocha/core/data-access';
import { Config } from '@atocha/spirit-islander/config/util';
import {
  GameSetup,
  createGameSetup,
} from '@atocha/spirit-islander/game-setup/util';
import {
  Settings,
  createDefaultSettings,
} from '@atocha/spirit-islander/settings/util';
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
import { AppState } from './internal/app-state.interface';
import { migrateConfig } from './internal/app-migration';
import { updateSettings } from './internal/update-settings';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  config$: Observable<Config>;
  gameSetup$: Observable<GameSetup | undefined>;
  settings$: Observable<Settings>;

  private _state: State<AppState>;
  private _state$: Observable<AppState>;
  private readonly _legacyConfigKey = 'CONFIG_NEW';
  private readonly _configKey = 'CONFIG';
  private readonly _settingsKey = 'SETTINGS';

  constructor(private _localStorageService: LocalStorageService) {
    const config = this._getConfig();
    const settings = this._getSettings();

    this._state = new State<AppState>({
      config,
      gameSetup: createGameSetup(config, settings),
      settings,
    });

    this._state$ = this._state.get().pipe(
      tap(({ config, settings }) => {
        this._setConfig(config);
        this._setSettings(settings);
      })
    );

    this.config$ = this._state$.pipe(map(({ config }) => config));
    this.gameSetup$ = this._state$.pipe(map(({ gameSetup }) => gameSetup));
    this.settings$ = this._state$.pipe(map(({ settings }) => settings));
  }

  updateConfig(config: Config): void {
    this._state
      .getProp('settings')
      .pipe(first())
      .subscribe((settings) => {
        this._state.updateProp('config', config);
        this._state.updateProp('gameSetup', createGameSetup(config, settings));
      });
  }

  updateGameSetup(): void {
    this._state
      .get()
      .pipe(first())
      .subscribe(({ config, settings }) =>
        this._state.updateProp('gameSetup', createGameSetup(config, settings))
      );
  }

  updateSettings(changes: Partial<Settings>): void {
    this._state.transform((state) => updateSettings(changes, state));
  }

  private _getConfig(): Config {
    const legacyConfig = this._localStorageService.getItem(
      this._legacyConfigKey
    );
    const config =
      legacyConfig || this._localStorageService.getItem(this._configKey);

    if (legacyConfig) {
      this._localStorageService.removeItem(this._legacyConfigKey);
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

  private _setConfig(config: Config): void {
    this._localStorageService.setItem(this._configKey, JSON.stringify(config));
  }

  private _getSettings(): Settings {
    const settings = this._localStorageService.getItem(this._settingsKey);
    return settings
      ? {
          // Ensure newest settings are included in case user hasn't visited in a while
          ...createDefaultSettings(),
          ...JSON.parse(settings),
        }
      : createDefaultSettings();
  }

  private _setSettings(settings: Settings): void {
    this._localStorageService.setItem(
      this._settingsKey,
      JSON.stringify(settings)
    );
  }
}
