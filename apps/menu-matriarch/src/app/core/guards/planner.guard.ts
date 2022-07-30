import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { RouterService } from '@services/router.service';

@Injectable({
  providedIn: 'root'
})
export class PlannerGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _routerService: RouterService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._routerService.getPlannerRoute().pipe(
      first(),
      map(route => {
        if (route.length > 1) {
          return this._router.createUrlTree(route);
        }
        return true;
      })
    );
  }
}
