import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { Card, Ordinal } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root'
})
export class OrdinalService {
  private _prefix = 'LORENZO_';
  private _keys: Record<Card, string> = {
    development: this._prefix + 'DEVELOPMENT_ORDINAL',
    family: this._prefix + 'FAMILY_ORDINAL',
    leader: this._prefix + 'LEADER_ORDINAL',
  };
  private _ordinalSubject = new BehaviorSubject<Record<Card, Ordinal>>({
    development: this._getOrdinal(this._keys.development, 3),
    family: this._getOrdinal(this._keys.family, 1),
    leader: this._getOrdinal(this._keys.leader, 2),
  });

  ordinal$ = this._ordinalSubject.pipe(
    tap(({ development, family, leader }) => {
      this._setOrdinal(this._keys.development, development);
      this._setOrdinal(this._keys.family, family);
      this._setOrdinal(this._keys.leader, leader);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  private _getOrdinal(key: string, backup: Ordinal): Ordinal {
    const ordinal = this._localStorageService.getItem(key);
    return ordinal ? parseInt(ordinal, 10) as Ordinal : backup;
  }

  private _setOrdinal(key: string, ordinal: Ordinal): void {
    this._localStorageService.setItem(key, ordinal.toString());
  }
}
