import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, of, tap } from 'rxjs';

import { SupabaseService } from '@atocha/supabase/data-access';
import { User, UserPreferences } from '@atocha/menu-matriarch/shared/util';
import { UserDtoService } from './internal/user-dto.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _supabase = inject(SupabaseService);
  private _userDtoService = inject(UserDtoService);

  getUser(): Observable<User | undefined> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        if (session?.user.id) {
          return this._userDtoService.getUser(session.user.id);
        }
        return of(undefined);
      })
    );
  }

  getPreferences(): Observable<UserPreferences | undefined> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        if (session?.user.id) {
          return this._userDtoService.getPreferences(session.user.id);
        }
        return of(undefined);
      })
    );
  }

  updatePreferences(
    data: Partial<UserPreferences>
  ): Observable<User | undefined> {
    return this.getUser().pipe(
      first(),
      tap(async (user) => {
        if (!user?.uid) {
          return;
        }
        await this._userDtoService.updatePreferences(user, data);
      })
    );
  }
}
