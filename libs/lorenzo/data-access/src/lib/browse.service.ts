import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Development, Family, Leader, View } from '@atocha/lorenzo/util';
import { CardService } from './card.service';
import { FavoriteService } from './favorite.service';
import { ViewService } from './view.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  view$ = this._viewService.view$;
  developments$ = this._cardService.developments$;
  families$ = this._cardService.families$;
  leaders$ = this._cardService.leaders$;

  favoriteDevelopmentIds$ = this._favoriteService.favoriteIds$.pipe(
    map(({ developments }) => developments)
  );
  favoriteFamilyIds$ = this._favoriteService.favoriteIds$.pipe(
    map(({ families }) => families)
  );
  favoriteLeaderIds$ = this._favoriteService.favoriteIds$.pipe(
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
    private _favoriteService: FavoriteService,
    private _viewService: ViewService,
  ) {}

  updateView(view: View): void {
    this._viewService.updateView(view);
  }

  updateFavoriteDevelopment(id: string): void {
    this._favoriteService.updateFavoriteId(id, 'development');
  }

  updateFavoriteFamily(id: string): void {
    this._favoriteService.updateFavoriteId(id, 'family');
  }

  updateFavoriteLeader(id: string): void {
    this._favoriteService.updateFavoriteId(id, 'leader');
  }

  clearFavorites() {
    this._favoriteService.clearFavorites();
  }
}
