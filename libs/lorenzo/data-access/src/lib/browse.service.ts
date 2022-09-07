import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Development, Family, Leader } from '@atocha/lorenzo/util';
import { LocalStorageService } from './local-storage.service';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  leaders$ = this._cardService.leaders$;
  developments$ = this._cardService.developments$;
  families$ = this._cardService.families$;

  favoriteLeaderIds$ = this._localStorageService.favoriteLeaderIds$;
  favoriteDevelopmentIds$ = this._localStorageService.favoriteDevelopmentIds$;
  favoriteFamilyIds$ = this._localStorageService.favoriteFamilyIds$;

  favoriteLeaders$: Observable<readonly Leader[]> = combineLatest([
    this.favoriteLeaderIds$,
    this.leaders$,
  ]).pipe(map(([ids, leaders]) => leaders.filter(({ name }) => ids.has(name))));
  favoriteDevelopments$: Observable<readonly Development[]> = combineLatest([
    this.favoriteDevelopmentIds$,
    this.developments$,
  ]).pipe(
    map(([ids, developments]) =>
      developments.filter(({ id }) => ids.has(id.toString()))
    )
  );
  favoriteFamilies$: Observable<readonly Family[]> = combineLatest([
    this.favoriteFamilyIds$,
    this.families$,
  ]).pipe(
    map(([ids, families]) => families.filter(({ name }) => ids.has(name)))
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

  updateFavoriteFamily(id: string): void {
    this._localStorageService.updateFavoriteFamily(id);
  }
}
