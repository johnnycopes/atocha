import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { includes } from '@atocha/core/util';
import {
  Card,
  getDevelopmentId,
  getFamilyId,
  getLeaderId,
} from '@atocha/lorenzo/util';
import { Cards, CardService } from './card.service';
import { FavoriteService } from './favorite.service';
import { OrdinalService } from './ordinal.service';
import { ViewService } from './view.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  private _cards$ = this._viewService.view$.pipe(
    switchMap((view) =>
      view === 'all' ? this._cardService.cards$ : this._favoriteCards$
    )
  );

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

  private _data$ = combineLatest([
    this._viewService.text$,
    this._ordinalService.ordinal$,
    this._cards$,
    this._favoriteService.ids$,
  ]).pipe(
    map(
      ([
        text,
        {
          development: developmentOrdinal,
          family: familyOrdinal,
          leader: leaderOrdinal,
        },
        { development: developments, family: families, leader: leaders },
        { development: developmentIds, family: familyIds, leader: leaderIds },
      ]) => ({
        developments: {
          ordinal: developmentOrdinal,
          totalCards: developments.length,
          filteredCards: developments.filter((card) =>
            includes([getDevelopmentId(card)], text)
          ),
          favoriteIds: developmentIds,
        },
        families: {
          ordinal: familyOrdinal,
          totalCards: families.length,
          filteredCards: families.filter((card) =>
            includes([getFamilyId(card)], text)
          ),
          favoriteIds: familyIds,
        },
        leaders: {
          ordinal: leaderOrdinal,
          totalCards: leaders.length,
          filteredCards: leaders.filter((card) =>
            includes([getLeaderId(card)], text)
          ),
          favoriteIds: leaderIds,
        },
      })
    )
  );

  developments$ = this._data$.pipe(
    map(({ developments }) => developments)
  );

  families$ = this._data$.pipe(
    map(({ families }) => families)
  );

  leaders$ = this._data$.pipe(
    map(({ leaders }) => leaders)
  );

  constructor(
    private _cardService: CardService,
    private _favoriteService: FavoriteService,
    private _ordinalService: OrdinalService,
    private _viewService: ViewService
  ) {}

  toggleFavoriteId(id: string, type: Card): void {
    this._favoriteService.toggleId(id, type);
  }

  moveUp(type: Card): void {
    this._ordinalService.decrementOrdinal(type);
  }

  moveDown(type: Card): void {
    this._ordinalService.incrementOrdinal(type);
  }
}
