import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, first, map } from 'rxjs';

import { AuthService } from '@atocha/firebase/data-access';

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
