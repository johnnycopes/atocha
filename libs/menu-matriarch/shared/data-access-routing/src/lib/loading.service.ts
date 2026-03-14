import { Injectable, inject } from '@angular/core';

import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _routerService = inject(RouterService);

  loading$ = this._routerService.loading$;
}
