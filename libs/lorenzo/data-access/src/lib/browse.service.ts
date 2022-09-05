import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Development, Leader } from '@atocha/lorenzo/util';
import { LocalStorageService } from './local-storage.service';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  leaders$ = this._cardService.leaders$;
  developments$ = this._cardService.developments$;
  favoriteLeaderIds$ = this._localStorageService.favoriteLeaderIds$;
  favoriteDevelopmentIds$ = this._localStorageService.favoriteDevelopmentIds$;

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

  constructor(
    private _cardService: CardService,
    private _localStorageService: LocalStorageService
  ) {}

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
