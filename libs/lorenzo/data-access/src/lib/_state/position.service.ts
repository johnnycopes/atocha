import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { State } from '@atocha/core/util';
import { View } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private _keys: Record<View, string> = {
    all: 'ALL_POSITION',
    favorites: 'FAVORITES_POSITION',
  };
  private _positions = new State<Record<View, number>>({
    all: this._getPosition(this._keys.all),
    favorites: this._getPosition(this._keys.favorites),
  });

  position$ = this._positions.get().pipe(
    tap(({ all, favorites }) => {
      this._setPosition(this._keys.all, all);
      this._setPosition(this._keys.favorites, favorites);
    })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updatePosition(position: number, view: View): void {
    this._positions.updateProp(view, position);
  }

  private _getPosition(key: string): number {
    const position = this._localStorageService.getItem(key);
    return position ? parseInt(position, 10) : 0;
  }

  private _setPosition(key: string, value: number): void {
    this._localStorageService.setItem(key, value.toString());
  }
}
