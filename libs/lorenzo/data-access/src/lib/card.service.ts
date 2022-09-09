import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

import { LEADERS, DEVELOPMENTS, FAMILIES } from '@atocha/lorenzo/util';
@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _cardSubject = new BehaviorSubject({
    developments: DEVELOPMENTS,
    families: FAMILIES,
    leaders: LEADERS,
  });

  cards$ = this._cardSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
