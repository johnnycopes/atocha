import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { View } from '@atocha/lorenzo/util';
import { Cards, CardService } from './card.service';
import { FavoriteService } from './favorite.service';
import { ViewService } from './view.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  cards$ = this._viewService.view$.pipe(
    switchMap((view) =>
      view === 'all' ? this._cardService.cards$ : this._favoriteCards$
    )
  );
  favoriteCardIds$ = this._favoriteService.ids$;
  view$ = this._viewService.view$;

  private _favoriteCards$: Observable<Cards> = combineLatest([
    this._cardService.cards$,
    this._favoriteService.ids$,
  ]).pipe(
    map(([cards, ids]) => ({
      development: cards.development.filter(({ id }) =>
        ids.development.has(id.toString())
      ),
      family: cards.family.filter(({ name }) => ids.family.has(name)),
      leader: cards.leader.filter(({ name }) => ids.leader.has(name)),
    }))
  );

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
