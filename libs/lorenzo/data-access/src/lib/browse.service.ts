import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Development, Family, Leader } from '@atocha/lorenzo/util';
import { SavedDataService } from './saved-data.service';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  leaders$ = this._cardService.leaders$;
  developments$ = this._cardService.developments$;
  families$ = this._cardService.families$;

  favoriteLeaderIds$ = this._savedDataService.favoriteIds$.pipe(
    map(({ leaders }) => leaders)
  );
  favoriteDevelopmentIds$ = this._savedDataService.favoriteIds$.pipe(
    map(({ developments }) => developments)
  );
  favoriteFamilyIds$ = this._savedDataService.favoriteIds$.pipe(
    map(({ families }) => families)
  );

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
    private _savedDataService: SavedDataService
  ) {}

  clearFavorites() {
    this._savedDataService.clearFavorites();
  }

  updateFavoriteLeader(id: string): void {
    this._savedDataService.updateFavoriteId(id, 'leader');
  }

  updateFavoriteDevelopment(id: string): void {
    this._savedDataService.updateFavoriteId(id, 'development');
  }

  updateFavoriteFamily(id: string): void {
    this._savedDataService.updateFavoriteId(id, 'family');
  }
}
