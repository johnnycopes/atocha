import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

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
    shareReplay({ bufferSize: 1, refCount: true })
  );
  favoriteDevelopmentIds$ = this._favoriteDevelopmentIdsSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  favoriteFamilyIds$ = this._favoriteFamilyIdsSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  updateFavoriteLeader(id: string): void {
    this._favoriteLeaderIdsSubject.pipe(first()).subscribe((favorites) => {
      const newFavorites = this._updateSet(favorites, id);
      this._favoriteLeaderIdsSubject.next(newFavorites);
      this._setIds(this._leadersKey, newFavorites);
    });
  }

  updateFavoriteDevelopment(id: string): void {
    this._favoriteDevelopmentIdsSubject.pipe(first()).subscribe((favorites) => {
      const newFavorites = this._updateSet(favorites, id);
      this._favoriteDevelopmentIdsSubject.next(newFavorites);
      this._setIds(this._developmentsKey, newFavorites);
    });
  }

  updateFavoriteFamily(id: string): void {
    this._favoriteFamilyIdsSubject.pipe(first()).subscribe((favorites) => {
      const newFavorites = this._updateSet(favorites, id);
      this._favoriteFamilyIdsSubject.next(newFavorites);
      this._setIds(this._familiesKey, newFavorites);
    });
  }

  clearFavorites() {
    const emptyLeaders = new Set<string>();
    const emptyDevelopments = new Set<string>();
    const emptyFamilies = new Set<string>();
    this._favoriteLeaderIdsSubject.next(emptyLeaders);
    this._favoriteDevelopmentIdsSubject.next(emptyDevelopments);
    this._favoriteFamilyIdsSubject.next(emptyFamilies);
    this._setIds(this._leadersKey, emptyLeaders);
    this._setIds(this._developmentsKey, emptyDevelopments);
    this._setIds(this._familiesKey, emptyFamilies);
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
