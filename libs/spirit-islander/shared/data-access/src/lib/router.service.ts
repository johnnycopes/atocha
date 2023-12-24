import { Injectable } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';

import { Config } from '@atocha/spirit-islander/config/util';
import { mapConfigToParams, mapParamsToConfig } from './internal/url-mappers';
import { ROUTES } from './routes';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  configParams$ = this._stateService.config$.pipe(map(mapConfigToParams));

  constructor(private _stateService: StateService, private _router: Router) {}

  async navigateToHome(): Promise<void> {
    await this._router.navigate([ROUTES.home]);
  }

  async navigateToGameSetup(config: Config): Promise<void> {
    await this._router.navigate([ROUTES.gameSetup], {
      queryParams: mapConfigToParams(config),
    });
  }

  async navigateToConfig(): Promise<void> {
    await this._router.navigate([ROUTES.config]);
  }

  async navigateToError(): Promise<void> {
    await this._router.navigate([ROUTES.error], {
      skipLocationChange: true,
      queryParamsHandling: 'preserve',
    });
  }

  async processParams(params: ParamMap): Promise<void> {
    try {
      const config = mapParamsToConfig(params);
      this._stateService.updateConfig(config);
    } catch {
      await this.navigateToError();
    }
  }
}
