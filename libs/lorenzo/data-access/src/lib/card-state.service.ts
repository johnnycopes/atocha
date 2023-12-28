import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, shareReplay, switchMap } from 'rxjs';

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
import { CardService } from './state/card.service';
import { FavoriteService } from './state/favorite.service';
import { FilterService } from './state/filter.service';
import { OrdinalService } from './state/ordinal.service';
import { VisibilityService } from './state/visibility.service';

export interface State<T> {
  ordinal: Ordinal;
  totalCards: number;
  filteredCards: readonly T[];
  favoriteIds: Set<string>;
  visible: boolean;
}

type Data = { [key in Extract<Card, 'development'>]: State<Development> } & {
  [key in Extract<Card, 'family'>]: State<Family>;
} & { [key in Extract<Card, 'leader'>]: State<Leader> };

@Injectable({
  providedIn: 'root',
})
export class CardStateService {
  private _cards$ = this._filterService.view$.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._cardService.cards$
        : this._cardService.favoriteCards$
    )
  );

  private _state$: Observable<Data> = combineLatest([
    this._filterService.text$,
    this._ordinalService.ordinal$,
    this._cards$,
    this._favoriteService.ids$,
    this._visibilityService.visibility$,
  ]).pipe(
    map(([text, ordinal, cards, favoriteIds, visibility]) => ({
      development: this._createState({
        ordinal: ordinal.development,
        visible: visibility.development,
        favoriteIds: favoriteIds.development,
        cards: cards.development,
        getId: getDevelopmentId,
        text,
      }),
      family: this._createState({
        ordinal: ordinal.family,
        visible: visibility.family,
        favoriteIds: favoriteIds.family,
        cards: cards.family,
        getId: getFamilyId,
        text,
      }),
      leader: this._createState({
        ordinal: ordinal.leader,
        visible: visibility.leader,
        favoriteIds: favoriteIds.leader,
        cards: cards.leader,
        getId: getLeaderId,
        text,
      }),
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  developments$ = this._state$.pipe(map(({ development }) => development));
  families$ = this._state$.pipe(map(({ family }) => family));
  leaders$ = this._state$.pipe(map(({ leader }) => leader));
  ordinal$ = this._ordinalService.ordinal$;

  constructor(
    private _cardService: CardService,
    private _favoriteService: FavoriteService,
    private _filterService: FilterService,
    private _ordinalService: OrdinalService,
    private _visibilityService: VisibilityService
  ) {}

  toggleFavoriteId(id: string, type: Card): void {
    this._favoriteService.toggleId(id, type);
  }

  clearFavoriteIds(): void {
    this._favoriteService.clearIds();
  }

  toggleVisibility(type: Card): void {
    this._visibilityService.toggleVisibility(type);
  }

  expandAll(): void {
    this._visibilityService.expandAll();
  }

  collapseAll(): void {
    this._visibilityService.collapseAll();
  }

  moveUp(type: Card): void {
    this._ordinalService.decrementOrdinal(type);
  }

  moveDown(type: Card): void {
    this._ordinalService.incrementOrdinal(type);
  }

  private _createState<T>({
    ordinal,
    visible,
    favoriteIds,
    cards,
    getId,
    text,
  }: {
    ordinal: Ordinal;
    visible: boolean;
    favoriteIds: Set<string>;
    cards: readonly T[];
    getId: (card: T) => string;
    text: string;
  }): State<T> {
    return {
      ordinal,
      visible,
      favoriteIds,
      totalCards: cards.length,
      filteredCards: cards.filter((card) => includes([getId(card)], text)),
    };
  }
}
