import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  Card,
  getDevelopmentId,
  getFamilyId,
  getLeaderId,
  View,
} from '@atocha/lorenzo/util';
import { Cards, CardService } from './card.service';
import { FavoriteService } from './favorite.service';
import { OrdinalService } from './ordinal.service';
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
  ordinal$ = this._ordinalService.ordinal$;
  view$ = this._viewService.view$;
  text$ = this._viewService.text$;

  private _favoriteCards$: Observable<Cards> = combineLatest([
    this._cardService.cards$,
    this._favoriteService.ids$,
  ]).pipe(
    map(([cards, ids]) => ({
      development: cards.development.filter((development) =>
        ids.development.has(getDevelopmentId(development))
      ),
      family: cards.family.filter((family) =>
        ids.family.has(getFamilyId(family))
      ),
      leader: cards.leader.filter((leader) =>
        ids.leader.has(getLeaderId(leader))
      ),
    }))
  );

  constructor(
    private _cardService: CardService,
    private _favoriteService: FavoriteService,
    private _ordinalService: OrdinalService,
    private _viewService: ViewService
  ) {}

  updateView(view: View): void {
    this._viewService.updateView(view);
  }

  updateText(text: string): void {
    this._viewService.updateText(text);
  }

  toggleFavoriteId(id: string, type: Card): void {
    this._favoriteService.toggleId(id, type);
  }

  clearFavorites(): void {
    this._favoriteService.clearIds();
  }

  moveUp(type: Card): void {
    this._ordinalService.decrementOrdinal(type);
  }

  moveDown(type: Card): void {
    this._ordinalService.incrementOrdinal(type);
  }
}
