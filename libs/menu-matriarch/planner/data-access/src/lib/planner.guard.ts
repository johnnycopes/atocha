import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, first, map } from 'rxjs';

import { PlannerService } from './planner.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerGuard {
  private _router = inject(Router);
  private _plannerService = inject(PlannerService);

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
