import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

import {
  LEADERS,
  DEVELOPMENTS,
  FAMILIES,
  Card,
  Development,
  Family,
  Leader,
} from '@atocha/lorenzo/util';

export type Cards = {
  [key in Extract<Card, 'development'>]: readonly Development[];
} & { [key in Extract<Card, 'family'>]: readonly Family[] } & {
  [key in Extract<Card, 'leader'>]: readonly Leader[];
};

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _cardSubject = new BehaviorSubject<Cards>({
    development: DEVELOPMENTS,
    family: FAMILIES,
    leader: LEADERS,
  });

  cards$ = this._cardSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
