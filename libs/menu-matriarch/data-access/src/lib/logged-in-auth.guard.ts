import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { PlannerService } from './planner.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _plannerService: PlannerService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._authService.loggedIn$.pipe(
      first(),
      switchMap((loggedIn) =>
        loggedIn
          ? this._plannerService.route$.pipe(
              map((route) => this._router.createUrlTree(route))
            )
          : of(true)
      )
    );
  }
}
