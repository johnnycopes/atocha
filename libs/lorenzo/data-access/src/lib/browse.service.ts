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
  favoriteDevelopmentIds$ = this._favoriteService.ids$.pipe(
    map(({ developments }) => developments)
  );
  favoriteFamilyIds$ = this._favoriteService.ids$.pipe(
    map(({ families }) => families)
  );
  favoriteLeaderIds$ = this._favoriteService.ids$.pipe(
    map(({ leaders }) => leaders)
  );

  private _developments$ = this._cardService.developments$;
  private _families$ = this._cardService.families$;
  private _leaders$ = this._cardService.leaders$;
  private _favoriteDevelopments$: Observable<readonly Development[]> = combineLatest([
    this.favoriteDevelopmentIds$,
    this._cardService.developments$,
  ]).pipe(
    map(([ids, developments]) =>
      developments.filter(({ id }) => ids.has(id.toString()))
    )
  );
  private _favoriteFamilies$: Observable<readonly Family[]> = combineLatest([
    this.favoriteFamilyIds$,
    this._families$,
  ]).pipe(
    map(([ids, families]) => families.filter(({ name }) => ids.has(name)))
  );
  private _favoriteLeaders$: Observable<readonly Leader[]> = combineLatest([
    this.favoriteLeaderIds$,
    this._leaders$,
  ]).pipe(map(([ids, leaders]) => leaders.filter(({ name }) => ids.has(name))));

  leaders$ = this.view$.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._leaders$
        : this._favoriteLeaders$
    )
  );

  developments$ = this.view$.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._developments$
        : this._favoriteDevelopments$
    )
  );

  families$ = this.view$.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._families$
        : this._favoriteFamilies$
    )
  );

  constructor(
    private _cardService: CardService,
    private _favoriteService: FavoriteService,
    private _viewService: ViewService,
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
