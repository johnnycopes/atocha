import { Injectable, inject } from '@angular/core';
import { Observable, first, tap } from 'rxjs';

import { User, UserPreferences } from '@atocha/menu-matriarch/shared/util';
import { UserDtoService } from './internal/user-dto.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userDtoService = inject(UserDtoService);

  getUser(): Observable<User | undefined> {
    return this._userDtoService.getUser();
  }

  getPreferences(): Observable<UserPreferences | undefined> {
    return this._userDtoService.getPreferences();
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
