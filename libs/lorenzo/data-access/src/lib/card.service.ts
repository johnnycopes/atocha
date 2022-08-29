import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
  DEVELOPMENTS,
  LEADERS,
} from '@atocha/lorenzo/util';

@Injectable({ providedIn: 'root' })
export class CardService {
  leaders$ = of(LEADERS).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  developments$ = of(DEVELOPMENTS).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
