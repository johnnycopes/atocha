import { Injectable } from '@angular/core';
import { BehaviorSubject, first, shareReplay, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { Card } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _prefix = 'LORENZO_';
  private _keys: Record<Card, string> = {
    development: this._prefix + 'DEVELOPMENT_IDS',
    family: this._prefix + 'FAMILY_IDS',
    leader: this._prefix + 'LEADER_IDS',
  };
  private _idsSubject = new BehaviorSubject<Record<Card, Set<string>>>({
    development: this._getIds(this._keys.development),
    family: this._getIds(this._keys.family),
    leader: this._getIds(this._keys.leader),
  });

  ids$ = this._idsSubject.pipe(
    tap(({ development, family, leader }) => {
      this._setIds(this._keys.development, development);
      this._setIds(this._keys.family, family);
      this._setIds(this._keys.leader, leader);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  toggleId(id: string, type: Card): void {
    this._idsSubject.pipe(first()).subscribe((favorites) => {
      switch (type) {
        case 'development': {
          this._idsSubject.next({
            ...favorites,
            development: this._updateSet(favorites.development, id),
          });
          break;
        }
        case 'family': {
          this._idsSubject.next({
            ...favorites,
            family: this._updateSet(favorites.family, id),
          });
          break;
        }
        case 'leader': {
          this._idsSubject.next({
            ...favorites,
            leader: this._updateSet(favorites.leader, id),
          });
          break;
        }
      }
    });
  }

  clearIds(): void {
    this._idsSubject.next({
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
