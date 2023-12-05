import { Injectable } from '@angular/core';

import { Settings } from '@atocha/spirit-islander/settings/util';
import { AppStateService } from './internal/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class AppFacadeService {
  state$ = this._appStateService.state$;

  constructor(private _appStateService: AppStateService) {}

  updateSettings(changes: Partial<Settings>): void {
    this._appStateService.updateSettings(changes);
  }

  refreshGameSetup(): void {
    this._appStateService.refreshGameSetup();
  }
}
