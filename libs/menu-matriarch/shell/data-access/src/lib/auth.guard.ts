import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._authService.loggedIn$.pipe(
      first(),
      map((loggedIn) => {
        if (!loggedIn) {
          return this._router.createUrlTree(['/welcome']);
        }
        return true;
      })
    );
  }
}
