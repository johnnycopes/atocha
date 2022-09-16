import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, shareReplay } from 'rxjs';

import {
  LEADERS,
  DEVELOPMENTS,
  FAMILIES,
  Card,
  Development,
  Family,
  Leader,
  getDevelopmentId,
  getFamilyId,
  getLeaderId,
} from '@atocha/lorenzo/util';
import { FavoriteService } from './favorite.service';

type Cards = {
  [key in Extract<Card, 'development'>]: readonly Development[];
} & { [key in Extract<Card, 'family'>]: readonly Family[] } & {
  [key in Extract<Card, 'leader'>]: readonly Leader[];
};

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _cardSubject = of<Cards>({
    development: DEVELOPMENTS,
    family: FAMILIES,
    leader: LEADERS,
  });

  cards$: Observable<Cards> = this._cardSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  favoriteCards$: Observable<Cards> = combineLatest([
    this.cards$,
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
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _favoriteService: FavoriteService) {}
}
