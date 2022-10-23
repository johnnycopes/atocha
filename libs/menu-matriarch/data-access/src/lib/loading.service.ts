import { Injectable } from '@angular/core';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$ = this._routerService.loading$;

  constructor(private _routerService: RouterService) {}
}
