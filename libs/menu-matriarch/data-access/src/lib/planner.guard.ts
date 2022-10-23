import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { PlannerService } from './planner.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _plannerService: PlannerService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._plannerService.route$.pipe(
      first(),
      map((route) =>
        route.length > 1 ? this._router.createUrlTree(route) : true
      )
    );
  }
}
