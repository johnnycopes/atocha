import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Development, Family, Leader, View } from '@atocha/lorenzo/util';
import { CardService } from './card.service';
import { FavoriteService } from './favorite.service';
import { ViewService } from './view.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  view$ = this._viewService.view$;
  developments$ = this.view$.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._cardService.developments$
        : this._favoriteDevelopments$
    )
  );
  families$ = this.view$.pipe(
    switchMap((view) =>
      view === 'all' ? this._cardService.families$ : this._favoriteFamilies$
    )
  );
  leaders$ = this.view$.pipe(
    switchMap((view) =>
      view === 'all' ? this._cardService.leaders$ : this._favoriteLeaders$
    )
  );
  favoriteDevelopmentIds$ = this._favoriteService.ids$.pipe(
    map(({ developments }) => developments)
  );
  favoriteFamilyIds$ = this._favoriteService.ids$.pipe(
    map(({ families }) => families)
  );
  favoriteLeaderIds$ = this._favoriteService.ids$.pipe(
    map(({ leaders }) => leaders)
  );
  private _favoriteDevelopments$: Observable<readonly Development[]> =
    combineLatest([
      this.favoriteDevelopmentIds$,
      this._cardService.developments$,
    ]).pipe(
      map(([ids, developments]) =>
        developments.filter(({ id }) => ids.has(id.toString()))
      )
    );
  private _favoriteFamilies$: Observable<readonly Family[]> = combineLatest([
    this.favoriteFamilyIds$,
    this._cardService.families$,
  ]).pipe(
    map(([ids, families]) => families.filter(({ name }) => ids.has(name)))
  );
  private _favoriteLeaders$: Observable<readonly Leader[]> = combineLatest([
    this.favoriteLeaderIds$,
    this._cardService.leaders$,
  ]).pipe(map(([ids, leaders]) => leaders.filter(({ name }) => ids.has(name))));

  constructor(
    private _cardService: CardService,
    private _favoriteService: FavoriteService,
    private _viewService: ViewService
  ) {}

  updateView(view: View): void {
    this._viewService.updateView(view);
  }

  toggleFavoriteDevelopment(id: string): void {
    this._favoriteService.toggleId(id, 'development');
  }

  toggleFavoriteFamily(id: string): void {
    this._favoriteService.toggleId(id, 'family');
  }

  toggleFavoriteLeader(id: string): void {
    this._favoriteService.toggleId(id, 'leader');
  }

  clearFavorites() {
    this._favoriteService.clearIds();
  }
}
