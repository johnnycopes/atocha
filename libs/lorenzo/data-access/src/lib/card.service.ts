import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

import { DEVELOPMENTS, LEADERS } from '@atocha/lorenzo/util';

@Injectable({ providedIn: 'root' })
export class CardService {
  private _favoriteSubject = new BehaviorSubject({
    leaders: new Map<string, boolean>(),
    developments: new Map<string, boolean>(),
  });
  favoriteLeaderIds$ = this._favoriteSubject.pipe(
    map(({ leaders }) => leaders),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  favoriteDevelopmentIds$ = this._favoriteSubject.pipe(
    map(({ developments }) => developments),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  leaders$ = of(LEADERS).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  developments$ = of(DEVELOPMENTS).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor() {
    this.updateFavoriteLeader('Bartolomeo Colleoni', true);
    this.updateFavoriteDevelopment('4', true);
    this.updateFavoriteDevelopment('5', true);
    this.updateFavoriteDevelopment('6', true);
  }

  updateFavoriteLeader(id: string, state: boolean): void {
    this._favoriteSubject.pipe(first()).subscribe(
      favorites => this._favoriteSubject.next({
        ...favorites,
        leaders: favorites.leaders.set(id, state)
      })
    );
  }

  updateFavoriteDevelopment(id: string, state: boolean): void {
    this._favoriteSubject.pipe(first()).subscribe(
      favorites => this._favoriteSubject.next({
        ...favorites,
        developments: favorites.developments.set(id, state)
      })
    );
  }
}
