import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, shareReplay, tap } from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';

interface FavoriteIds {
  developments: Set<string>;
  families: Set<string>;
  leaders: Set<string>;
}

type CardType = 'development' | 'family' | 'leader';

@Injectable({
  providedIn: 'root',
})
export class SavedDataService {
  private _prefix = 'LORENZO_';
  private _developmentsKey = this._prefix + 'DEVELOPMENT_IDS';
  private _familiesKey = this._prefix + 'FAMILY_IDS';
  private _leadersKey = this._prefix + 'LEADER_IDS';

  private _favoriteIdsSubject = new BehaviorSubject<FavoriteIds>({
    developments: this._getIds(this._developmentsKey),
    families: this._getIds(this._familiesKey),
    leaders: this._getIds(this._leadersKey),
  });

  favoriteIds$ = this._favoriteIdsSubject.pipe(
    tap(({ families, developments, leaders }) => {
      this._setIds(this._developmentsKey, developments);
      this._setIds(this._familiesKey, families);
      this._setIds(this._leadersKey, leaders);
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
