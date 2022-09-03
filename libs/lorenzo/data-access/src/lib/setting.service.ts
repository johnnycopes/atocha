import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { first } from 'rxjs/operators';

import { Settings } from '@atocha/lorenzo/util';

@Injectable({ providedIn: 'root' })
export class SettingService {
  private _settings = new BehaviorSubject<Settings>({
    showFavorites: true
  });

  state$ = this._settings.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  toggleShowFavorites(): void {
    this._settings.pipe(first()).subscribe(
      settings => this._settings.next({
        ...settings,
        showFavorites: !settings.showFavorites,
      })
    );
  }
}
