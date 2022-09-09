import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Development, Family, Leader, View } from '@atocha/lorenzo/util';
import { CardService } from './card.service';
import { SavedDataService } from './saved-data.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  view$ = this._savedDataService.view$;
  developments$ = this._cardService.developments$;
  families$ = this._cardService.families$;
  leaders$ = this._cardService.leaders$;

  favoriteDevelopmentIds$ = this._savedDataService.favoriteIds$.pipe(
    map(({ developments }) => developments)
  );
  favoriteFamilyIds$ = this._savedDataService.favoriteIds$.pipe(
    map(({ families }) => families)
  );
  favoriteLeaderIds$ = this._savedDataService.favoriteIds$.pipe(
    map(({ leaders }) => leaders)
  );

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
  favoriteLeaders$: Observable<readonly Leader[]> = combineLatest([
    this.favoriteLeaderIds$,
    this.leaders$,
  ]).pipe(map(([ids, leaders]) => leaders.filter(({ name }) => ids.has(name))));

  constructor(
    private _cardService: CardService,
    private _savedDataService: SavedDataService
  ) {}

  updateView(view: View): void {
    this._savedDataService.updateView(view);
  }

  updateFavoriteDevelopment(id: string): void {
    this._savedDataService.updateFavoriteId(id, 'development');
  }

  updateFavoriteFamily(id: string): void {
    this._savedDataService.updateFavoriteId(id, 'family');
  }

  updateFavoriteLeader(id: string): void {
    this._savedDataService.updateFavoriteId(id, 'leader');
  }

  clearFavorites() {
    this._savedDataService.clearFavorites();
  }
}
