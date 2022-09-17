import { Injectable } from '@angular/core';
import { BehaviorSubject, first, shareReplay, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { View } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private _prefix = 'LORENZO_';
  private _keys: Record<View, string> = {
    all: this._prefix + 'ALL_POSITION',
    favorites: this._prefix + 'FAVORITES_POSITION',
  };
  private _positionSubject = new BehaviorSubject<Record<View, number>>({
    all: this._getPosition(this._keys.all),
    favorites: this._getPosition(this._keys.favorites),
  });

  position$ = this._positionSubject.pipe(
    tap(({ all, favorites }) => {
      this._setPosition(this._keys.all, all);
      this._setPosition(this._keys.favorites, favorites);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updatePosition(position: number, view: View): void {
    this.position$.pipe(first()).subscribe((positions) =>
      this._positionSubject.next({
        ...positions,
        [view]: position,
      })
    );
  }

  private _getPosition(key: string): number {
    const position = this._localStorageService.getItem(key);
    return position ? parseInt(position, 10) : 0;
  }

  private _setPosition(key: string, value: number): void {
    this._localStorageService.setItem(key, value.toString());
  }
}
