import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, first, map, of, switchMap } from 'rxjs';

import { SupabaseService } from '@atocha/supabase/data-access';
import { PlannerService } from '@atocha/menu-matriarch/planner/data-access';

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard {
  private _router = inject(Router);
  private _supabase = inject(SupabaseService);
  private _plannerService = inject(PlannerService);

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._supabase.session$.pipe(
      first(),
      switchMap((session) =>
        session
          ? this._plannerService.route$.pipe(
              map((route) => this._router.createUrlTree(route))
            )
          : of(true)
      )
    );
  }
}
