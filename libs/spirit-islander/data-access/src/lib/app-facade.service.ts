import { Injectable } from '@angular/core';
import { ParamMap, Router } from '@angular/router';

import { Config, getValidCombos, Route } from '@atocha/spirit-islander/util';
import { AppStateService } from './app-state.service';
import { mapConfigToParams, mapParamsToConfig } from './url-mappers';

@Injectable({
  providedIn: 'root',
})
export class AppFacadeService {
  state$ = this._appStateService.state$;

  constructor(
    private _appStateService: AppStateService,
    private _router: Router
  ) {}

  async navigateToHome(): Promise<void> {
    await this._router.navigate([Route.Home]);
  }

  async navigateToGameSetup(config: Config): Promise<void> {
    await this._router.navigate([Route.GameSetup], {
      queryParams: mapConfigToParams(config),
    });
  }

  async navigateToConfig(): Promise<void> {
    await this._router.navigate([Route.Config]);
  }

  async navigateToError(): Promise<void> {
    await this._router.navigate([Route.Error], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });
  }

  async processParams(params: ParamMap): Promise<void> {
    try {
      const config = mapParamsToConfig(params);
      const validCombos = getValidCombos(config);
      this._appStateService.updateState(config, validCombos);
    } catch {
      await this.navigateToError();
    }
  }

  refreshGameSetup(): void {
    this._appStateService.refreshGameSetup();
  }
}
