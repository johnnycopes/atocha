import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { includes } from '@atocha/core/util';
import {
  Card,
  Development,
  Family,
  getDevelopmentId,
  getFamilyId,
  getLeaderId,
  Leader,
  Ordinal,
} from '@atocha/lorenzo/util';
import { CardService } from './_state/card.service';
import { FavoriteService } from './_state/favorite.service';
import { OrdinalService } from './_state/ordinal.service';
import { ViewService } from './_state/view.service';

interface State<T> {
  ordinal: Ordinal;
  totalCards: number;
  filteredCards: readonly T[];
  favoriteIds: Set<string>;
}

type Data =
  { [key in Extract<Card, 'development'>]: State<Development> } &
  { [key in Extract<Card, 'family'>]: State<Family> } &
  { [key in Extract<Card, 'leader'>]: State<Leader> }
;

@Injectable({
  providedIn: 'root',
})
export class CardStateService {
  private _cards$ = this._viewService.view$.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._cardService.cards$
        : this._cardService.favoriteCards$
    )
  );

  private _state$: Observable<Data> = combineLatest([
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
        development: {
          ordinal: developmentOrdinal,
          totalCards: developments.length,
          filteredCards: developments.filter((card) =>
            includes([getDevelopmentId(card)], text)
          ),
          favoriteIds: developmentIds,
        },
        family: {
          ordinal: familyOrdinal,
          totalCards: families.length,
          filteredCards: families.filter((card) =>
            includes([getFamilyId(card)], text)
          ),
          favoriteIds: familyIds,
        },
        leader: {
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

  developments$ = this._state$.pipe(map(({ development }) => development));
  families$ = this._state$.pipe(map(({ family }) => family));
  leaders$ = this._state$.pipe(map(({ leader }) => leader));
  favoriteIds$ = this._favoriteService.ids$;
  ordinal$ = this._ordinalService.ordinal$;

  constructor(
    private _cardService: CardService,
    private _favoriteService: FavoriteService,
    private _ordinalService: OrdinalService,
    private _viewService: ViewService
  ) {}

  toggleFavoriteId(id: string, type: Card): void {
    this._favoriteService.toggleId(id, type);
  }

  clearFavoriteIds(): void {
    this._favoriteService.clearIds();
  }

  moveUp(type: Card): void {
    this._ordinalService.decrementOrdinal(type);
  }

  moveDown(type: Card): void {
    this._ordinalService.incrementOrdinal(type);
  }
}
