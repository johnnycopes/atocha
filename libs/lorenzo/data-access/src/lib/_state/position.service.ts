import { Injectable } from '@angular/core';
import { BehaviorSubject, first, shareReplay } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { View } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _prefix = 'LORENZO_';
  private _keys: Record<View, string> = {
    all: this._prefix + 'ALL_POSITION',
    favorites: this._prefix + 'FAVORITES_POSITION',
  };
  private _positionSubject = new BehaviorSubject<Record<View, number>>({
    all: 877,
    favorites: 86
  });

  position$ = this._positionSubject.pipe(
    // tap(({ development, family, leader }) => {
    //   this._setIds(this._keys.development, development);
    //   this._setIds(this._keys.family, family);
    //   this._setIds(this._keys.leader, leader);
    // }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updatePosition(position: number, view: View): void {
    console.log(position, view);
    this.position$.pipe(first()).subscribe(positions => this._positionSubject.next({
      ...positions,
      [view]: position,
    }));
    console.log(this._positionSubject.value);
  }
}
