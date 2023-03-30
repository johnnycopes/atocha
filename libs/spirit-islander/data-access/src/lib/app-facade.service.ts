import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Config, Route } from '@atocha/spirit-islander/util';
import { mapConfigToQueryParams } from './routing';

@Injectable({
  providedIn: 'root',
})
export class AppFacadeService {
  constructor(private _router: Router) {}

  async navigateToHome(): Promise<void> {
    await this._router.navigate([Route.Home]);
  }

  async navigateToGameSetup(config: Config): Promise<void> {
    await this._router.navigate([Route.GameSetup], {
      queryParams: mapConfigToQueryParams(config),
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
}
