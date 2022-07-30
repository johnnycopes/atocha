import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first, tap } from 'rxjs/operators';

import { User } from '@models/user.interface';
import { UserPreferences } from '@models/user-preferences.interface';
import { AuthService } from './auth.service';
import { UserDataService } from './internal/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _authService: AuthService,
    private _userDataService: UserDataService,
  ) { }

  public getUser(): Observable<User | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(uid => {
        if (uid) {
          return this._userDataService.getUser(uid);
        }
        return of(undefined);
      }),
    );
  }

  public getPreferences(): Observable<UserPreferences | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(uid => {
        if (uid) {
          return this._userDataService.getPreferences(uid);
        }
        return of(undefined);
      }),
    );
  }

  public updatePreferences(data: Partial<UserPreferences>): Observable<User | undefined> {
    return this.getUser().pipe(
      first(),
      tap(async user => {
        if (!user?.uid) {
          return;
        }
        await this._userDataService.updatePreferences(user, data);
      }),
    );
  }
}
