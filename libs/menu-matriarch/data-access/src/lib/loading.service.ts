import { Injectable } from '@angular/core';

import { RouterService } from '@atocha/menu-matriarch/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$ = this._routerService.loading$;

  constructor(private _routerService: RouterService) {}
}
