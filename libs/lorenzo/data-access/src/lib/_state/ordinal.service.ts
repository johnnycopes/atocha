import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { State } from '@atocha/core/util';
import { Card, Ordinal } from '@atocha/lorenzo/util';

type Ordinals = Record<Card, Ordinal>;

@Injectable({
  providedIn: 'root',
})
export class OrdinalService {
  private _keys: Record<Card, string> = {
    development: 'DEVELOPMENT_ORDINAL',
    family: 'FAMILY_ORDINAL',
    leader: 'LEADER_ORDINAL',
  };
  private _ordinals = new State<Ordinals>({
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

  incrementOrdinal(type: Card): void {
    this.ordinal$.pipe(first()).subscribe((ordinals) => {
      const currentOrdinal = ordinals[type];
      const target = Object.entries(ordinals).find(
        ([_, ordinal]) => ordinal === currentOrdinal + 1
      );
      if (target) {
        this._ordinals.update({
          ...ordinals,
          [target[0]]: currentOrdinal,
          [type]: target[1],
        });
      }
    });
  }

  decrementOrdinal(type: Card): void {
    this.ordinal$.pipe(first()).subscribe((ordinals) => {
      const currentOrdinal = ordinals[type];
      const target = Object.entries(ordinals).find(
        ([_, ordinal]) => ordinal === currentOrdinal - 1
      );
      if (target) {
        this._ordinals.update({
          ...ordinals,
          [target[0]]: currentOrdinal,
          [type]: target[1],
        });
      }
    });
  }

  constructor(private _localStorageService: LocalStorageService) {}

  private _getOrdinal(key: string, fallback: Ordinal): Ordinal {
    const ordinal = this._localStorageService.getItem(key);
    return ordinal ? (parseInt(ordinal, 10) as Ordinal) : fallback;
  }

  private _setOrdinal(key: string, ordinal: Ordinal): void {
    this._localStorageService.setItem(key, ordinal.toString());
  }
}
