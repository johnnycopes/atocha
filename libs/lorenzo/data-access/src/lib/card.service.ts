import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

import { DEVELOPMENTS, LEADERS } from '@atocha/lorenzo/util';

@Injectable({ providedIn: 'root' })
export class CardService {
  leaders$ = of(LEADERS).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  developments$ = of(DEVELOPMENTS).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  favoriteLeaders$ = of(new Map<string, boolean>());
  favoriteDevelopments$ = of(new Map<string, boolean>());

  constructor() {
    this.favoriteDevelopments$.pipe(first()).subscribe(
      favorites => {
        favorites.set('4', true);
        favorites.set('5', true);
        favorites.set('6', true);
      }
    )
  }

  updateFavoriteLeader(id: string, state: boolean): void {
    this.favoriteLeaders$.pipe(first()).subscribe(
      favorites => favorites.set(id, state)
    );
  }

  updateFavoriteDevelopment(id: string, state: boolean): void {
    this.favoriteDevelopments$.pipe(first()).subscribe(
      favorites => favorites.set(id, state)
    );
  }
}
