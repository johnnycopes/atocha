import { Injectable } from '@angular/core';
import { BehaviorSubject, first, shareReplay, tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';

interface FavoriteIds {
  developments: Set<string>;
  families: Set<string>;
  leaders: Set<string>;
}

type CardType = 'development' | 'family' | 'leader';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _prefix = 'LORENZO_';
  private _keys: Record<CardType, string> = {
    development: this._prefix + 'DEVELOPMENT_IDS',
    family: this._prefix + 'FAMILY_IDS',
    leader: this._prefix + 'LEADER_IDS',
  };
  private _favoriteIdsSubject = new BehaviorSubject<FavoriteIds>({
    developments: this._getIds(this._keys.development),
    families: this._getIds(this._keys.family),
    leaders: this._getIds(this._keys.leader),
  });

  favoriteIds$ = this._favoriteIdsSubject.pipe(
    tap(({ families, developments, leaders }) => {
      this._setIds(this._keys.development, developments);
      this._setIds(this._keys.family, families);
      this._setIds(this._keys.leader, leaders);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updateFavoriteId(id: string, type: CardType): void {
    this._favoriteIdsSubject.pipe(first()).subscribe((favorites) => {
      switch (type) {
        case 'development': {
          this._favoriteIdsSubject.next({
            ...favorites,
            developments: this._updateSet(favorites.developments, id),
          });
          break;
        }
        case 'family': {
          this._favoriteIdsSubject.next({
            ...favorites,
            families: this._updateSet(favorites.families, id),
          });
          break;
        }
        case 'leader': {
          this._favoriteIdsSubject.next({
            ...favorites,
            leaders: this._updateSet(favorites.leaders, id),
          });
          break;
        }
      }
    });
  }

  clearFavorites() {
    this._favoriteIdsSubject.next({
      developments: new Set(),
      families: new Set(),
      leaders: new Set(),
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
