import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { State } from '@atocha/core/data-access';
import { Card, Ordinal } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root',
})
export class OrdinalService {
  private readonly _keys: Record<Card, string> = {
    development: 'DEVELOPMENT_ORDINAL',
    family: 'FAMILY_ORDINAL',
    leader: 'LEADER_ORDINAL',
  };
  private readonly _ordinals = new State<Record<Card, Ordinal>>({
    development: this._getOrdinal(this._keys.development, 3),
    family: this._getOrdinal(this._keys.family, 1),
    leader: this._getOrdinal(this._keys.leader, 2),
  });

  ordinal$ = this._ordinals.get().pipe(
    tap(({ development, family, leader }) => {
      this._setOrdinal(this._keys.development, development);
      this._setOrdinal(this._keys.family, family);
      this._setOrdinal(this._keys.leader, leader);
    })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  incrementOrdinal(type: Card): void {
    this._ordinals.transform((ordinals) =>
      this._modifyOrdinal({ ordinals, type, modification: 'increment' })
    );
  }

  decrementOrdinal(type: Card): void {
    this._ordinals.transform((ordinals) =>
      this._modifyOrdinal({ ordinals, type, modification: 'decrement' })
    );
  }

  private _modifyOrdinal({
    ordinals,
    type,
    modification,
  }: {
    ordinals: Record<Card, Ordinal>;
    type: Card;
    modification: 'increment' | 'decrement';
  }): Record<Card, Ordinal> {
    const currentOrdinal = ordinals[type];
    const targetOrdinal =
      modification === 'increment' ? currentOrdinal + 1 : currentOrdinal - 1;
    const targetEntry = Object.entries(ordinals).find(
      ([_, ordinal]) => ordinal === targetOrdinal
    );

    return !targetEntry
      ? ordinals
      : {
          ...ordinals,
          [targetEntry[0]]: currentOrdinal,
          [type]: targetOrdinal,
        };
  }

  private _getOrdinal(key: string, fallback: Ordinal): Ordinal {
    const ordinal = this._localStorageService.getItem(key);
    return ordinal ? (parseInt(ordinal, 10) as Ordinal) : fallback;
  }

  private _setOrdinal(key: string, ordinal: Ordinal): void {
    this._localStorageService.setItem(key, ordinal.toString());
  }
}
