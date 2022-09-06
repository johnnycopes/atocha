import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _prefix = 'LORENZO_';
  private _leadersKey = this._prefix + 'LEADER_IDS';
  private _developmentsKey = this._prefix + 'DEVELOPMENT_IDS';
  private _favoriteLeaderIdsSubject = new BehaviorSubject<Set<string>>(
    this._getIds(this._leadersKey)
  );
  private _favoriteDevelopmentIdsSubject = new BehaviorSubject<Set<string>>(
    this._getIds(this._developmentsKey)
  );
  favoriteLeaderIds$ = this._favoriteLeaderIdsSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  favoriteDevelopmentIds$ = this._favoriteDevelopmentIdsSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

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

  clearFavorites() {
    const emptyLeaders = new Set<string>();
    const emptyDevelopments = new Set<string>();
    this._favoriteLeaderIdsSubject.next(emptyLeaders);
    this._favoriteDevelopmentIdsSubject.next(emptyDevelopments);
    this._setIds(this._leadersKey, emptyLeaders);
    this._setIds(this._developmentsKey, emptyDevelopments);
  }

  private _getIds(key: string): Set<string> {
    const ids = window.localStorage.getItem(key);
    return new Set<string>(ids ? JSON.parse(ids) : '');
  }

  private _setIds(key: string, ids: Set<string>): void {
    window.localStorage.setItem(key, JSON.stringify(Array.from(ids)));
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
