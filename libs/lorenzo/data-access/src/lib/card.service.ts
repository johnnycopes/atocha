import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

import { Development, DEVELOPMENTS, Leader, LEADERS } from '@atocha/lorenzo/util';

@Injectable({ providedIn: 'root' })
export class CardService {
  private _favoriteLeaderIdsSubject = new BehaviorSubject<Set<string>>(new Set());
  private _favoriteDevelopmentIdsSubject = new BehaviorSubject<Set<string>>(new Set());
  favoriteLeaderIds$ = this._favoriteLeaderIdsSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  favoriteDevelopmentIds$ = this._favoriteDevelopmentIdsSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  leaders$ = of(LEADERS).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  developments$ = of(DEVELOPMENTS).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  favoriteLeaders$: Observable<readonly Leader[]> = combineLatest([
    this.favoriteLeaderIds$,
    this.leaders$,
  ]).pipe(
    map(([ids, leaders]) => leaders.filter(leader => ids.has(leader.name)))
  );
  favoriteDevelopments$: Observable<readonly Development[]> = combineLatest([
    this.favoriteDevelopmentIds$,
    this.developments$,
  ]).pipe(
    map(([ids, developments]) => developments.filter(development => ids.has(development.id.toString())))
  );

  constructor() {
    this.updateFavoriteLeader('Bartolomeo Colleoni');
    this.updateFavoriteDevelopment('4');
    this.updateFavoriteDevelopment('5');
    this.updateFavoriteDevelopment('6');
  }

  clearFavorites() {
    this._favoriteLeaderIdsSubject.next(new Set());
    this._favoriteDevelopmentIdsSubject.next(new Set());
  }

  updateFavoriteLeader(id: string): void {
    this._favoriteLeaderIdsSubject.pipe(first()).subscribe(
      favorites => this._favoriteLeaderIdsSubject.next(this._updateSet(favorites, id))
    );
  }

  updateFavoriteDevelopment(id: string): void {
    this._favoriteDevelopmentIdsSubject.pipe(first()).subscribe(
      favorites => this._favoriteDevelopmentIdsSubject.next(this._updateSet(favorites, id))
    );
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
