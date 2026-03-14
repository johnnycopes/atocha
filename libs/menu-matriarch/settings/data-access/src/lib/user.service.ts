import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, of, tap } from 'rxjs';

import { AuthService } from '@atocha/firebase/data-access';
import { User, UserPreferences } from '@atocha/menu-matriarch/shared/util';
import { UserDtoService } from './internal/user-dto.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _authService = inject(AuthService);
  private _userDtoService = inject(UserDtoService);

  getUser(): Observable<User | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._userDtoService.getUser(uid);
        }
        return of(undefined);
      })
    );
  }

  getPreferences(): Observable<UserPreferences | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._userDtoService.getPreferences(uid);
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
