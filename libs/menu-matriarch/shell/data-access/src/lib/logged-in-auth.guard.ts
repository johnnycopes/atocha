import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, first, map, of, switchMap } from 'rxjs';

import { AuthService } from '@atocha/firebase/data-access';
import { PlannerService } from '@atocha/menu-matriarch/planner/data-access';

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _plannerService = inject(PlannerService);

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
