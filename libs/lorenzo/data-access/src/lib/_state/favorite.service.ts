import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { State } from '@atocha/core/util';
import { Card } from '@atocha/lorenzo/util';

type Ids = Record<Card, Set<string>>;

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _keys: Record<Card, string> = {
    development: 'DEVELOPMENT_IDS',
    family: 'FAMILY_IDS',
    leader: 'LEADER_IDS',
  };

  private _ids = new State<Ids>({
    development: this._getIds(this._keys.development),
    family: this._getIds(this._keys.family),
    leader: this._getIds(this._keys.leader),
  });

  ids$ = this._ids.get().pipe(
    tap(({ development, family, leader }) => {
      this._setIds(this._keys.development, development);
      this._setIds(this._keys.family, family);
      this._setIds(this._keys.leader, leader);
    })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  toggleId(id: string, type: Card): void {
    this._ids
      .getProp(type)
      .pipe(first())
      .subscribe((favorites) => {
        this._ids.updateProp(type, this._updateSet(favorites, id));
      });
  }

  clearIds(): void {
    this._ids.update({
      development: new Set(),
      family: new Set(),
      leader: new Set(),
    });
  }

  private _getIds(key: string): Set<string> {
    const ids = this._localStorageService.getItem(key);
    return new Set<string>(ids ? JSON.parse(ids) : '');
  }

  private _setIds(key: string, ids: Set<string>): void {
    this._localStorageService.setItem(key, JSON.stringify(Array.from(ids)));
  }

  private _updateSet(set: Set<string>, key: string): Set<string> {
    if (set.has(key)) {
      const newSet = new Set(set);
      newSet.delete(key);
      return newSet;
    } else {
      return set.add(key);
    }
  }
}
