import { Injectable } from '@angular/core';
import { of, shareReplay } from 'rxjs';

import { LEADERS, DEVELOPMENTS, FAMILIES } from '@atocha/lorenzo/util';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  leaders$ = of(LEADERS).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  developments$ = of(DEVELOPMENTS).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  families$ = of(FAMILIES).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
