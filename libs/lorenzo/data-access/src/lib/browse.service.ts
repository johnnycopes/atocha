import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Development, DEVELOPMENTS, Leader, LEADERS } from '@atocha/lorenzo/util';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  favoriteLeaderIds$ = this._localStorageService.favoriteLeaderIds$;
  favoriteDevelopmentIds$ = this._localStorageService.favoriteDevelopmentIds$;
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

  constructor(private _localStorageService: LocalStorageService) {}

  clearFavorites() {
    this._localStorageService.clearFavorites();
  }

  updateFavoriteLeader(id: string): void {
    this._localStorageService.updateFavoriteLeader(id);
  }

  updateFavoriteDevelopment(id: string): void {
    this._localStorageService.updateFavoriteDevelopment(id);
  }
}
