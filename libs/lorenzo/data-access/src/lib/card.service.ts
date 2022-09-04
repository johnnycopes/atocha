import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

import { Development, DEVELOPMENTS, Leader, LEADERS } from '@atocha/lorenzo/util';

@Injectable({ providedIn: 'root' })
export class CardService {
  private _favoriteLeaderIdsSubject = new BehaviorSubject(new Map<string, boolean>());
  private _favoriteDevelopmentIdsSubject = new BehaviorSubject(new Map<string, boolean>());
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
    map(([ids, leaders]) => leaders.filter(leader => !!ids.get(leader.name)))
  );
  favoriteDevelopments$: Observable<readonly Development[]> = combineLatest([
    this.favoriteDevelopmentIds$,
    this.developments$,
  ]).pipe(
    map(([ids, developments]) => developments.filter(development => !!ids.get(development.id.toString())))
  );

  constructor() {
    this.updateFavoriteLeader('Bartolomeo Colleoni');
    this.updateFavoriteDevelopment('4');
    this.updateFavoriteDevelopment('5');
    this.updateFavoriteDevelopment('6');
  }

  updateFavoriteLeader(id: string): void {
    this._favoriteLeaderIdsSubject.pipe(first()).subscribe(
      favorites => this._favoriteLeaderIdsSubject.next(this._updateMap(favorites, id))
    );
  }

  updateFavoriteDevelopment(id: string): void {
    this._favoriteDevelopmentIdsSubject.pipe(first()).subscribe(
      favorites => this._favoriteDevelopmentIdsSubject.next(this._updateMap(favorites, id))
    );
  }

  private _updateMap(map: Map<string, boolean>, key: string): Map<string, boolean> {
    if (map.has(key)) {
      const newMap = new Map(map);
      newMap.delete(key);
      return newMap;
    } else {
      return map.set(key, true);
    }
  }
}
