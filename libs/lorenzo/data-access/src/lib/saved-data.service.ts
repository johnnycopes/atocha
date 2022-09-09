import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, shareReplay, tap } from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';

@Injectable({
  providedIn: 'root',
})
export class SavedDataService {
  private _prefix = 'LORENZO_';
  private _leadersKey = this._prefix + 'LEADER_IDS';
  private _developmentsKey = this._prefix + 'DEVELOPMENT_IDS';
  private _familiesKey = this._prefix + 'FAMILY_IDS';
  private _favoriteLeaderIdsSubject = new BehaviorSubject<Set<string>>(
    this._getIds(this._leadersKey)
  );
  private _favoriteDevelopmentIdsSubject = new BehaviorSubject<Set<string>>(
    this._getIds(this._developmentsKey)
  );
  private _favoriteFamilyIdsSubject = new BehaviorSubject<Set<string>>(
    this._getIds(this._familiesKey)
  );
  favoriteLeaderIds$ = this._favoriteLeaderIdsSubject.pipe(
    tap(ids => this._setIds(this._leadersKey, ids)),
    shareReplay({ bufferSize: 1, refCount: true })
    );
  favoriteDevelopmentIds$ = this._favoriteDevelopmentIdsSubject.pipe(
    tap(ids => this._setIds(this._developmentsKey, ids)),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  favoriteFamilyIds$ = this._favoriteFamilyIdsSubject.pipe(
    tap(ids => this._setIds(this._familiesKey, ids)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updateFavoriteLeader(id: string): void {
    this._favoriteLeaderIdsSubject.pipe(first()).subscribe(
      (favorites) => this._favoriteLeaderIdsSubject.next(this._updateSet(favorites, id))
    );
  }

  updateFavoriteDevelopment(id: string): void {
    this._favoriteDevelopmentIdsSubject.pipe(first()).subscribe(
      (favorites) => this._favoriteDevelopmentIdsSubject.next(this._updateSet(favorites, id))
    );
  }

  updateFavoriteFamily(id: string): void {
    this._favoriteFamilyIdsSubject.pipe(first()).subscribe(
      (favorites) => this._favoriteFamilyIdsSubject.next(this._updateSet(favorites, id))
    );
  }

  clearFavorites() {
    this._favoriteLeaderIdsSubject.next(new Set());
    this._favoriteDevelopmentIdsSubject.next(new Set());
    this._favoriteFamilyIdsSubject.next(new Set());
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
