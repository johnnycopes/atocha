import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, first, map } from 'rxjs';

import { SupabaseService } from '@atocha/supabase/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private _router = inject(Router);
  private _supabase = inject(SupabaseService);

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._supabase.session$.pipe(
      first(),
      map((session) => {
        if (!session) {
          return this._router.createUrlTree(['/welcome']);
        }
        return true;
      })
    );
  }
}
