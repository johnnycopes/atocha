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
    this.updateFavoriteLeader('Bartolomeo Colleoni', true);
    this.updateFavoriteDevelopment('4', true);
    this.updateFavoriteDevelopment('5', true);
    this.updateFavoriteDevelopment('6', true);
  }

  updateFavoriteLeader(id: string, state: boolean): void {
    this._favoriteLeaderIdsSubject.pipe(first()).subscribe(
      favorites => this._favoriteLeaderIdsSubject.next(favorites.set(id, state))
    );
  }

  updateFavoriteDevelopment(id: string, state: boolean): void {
    this._favoriteDevelopmentIdsSubject.pipe(first()).subscribe(
      favorites => this._favoriteDevelopmentIdsSubject.next(favorites.set(id, state))
    );
  }
}
