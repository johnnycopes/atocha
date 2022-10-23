import { Injectable } from '@angular/core';

import { RouterService } from './internal/router.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$ = this._routerService.loading$;

  constructor(private _routerService: RouterService) {}
}
