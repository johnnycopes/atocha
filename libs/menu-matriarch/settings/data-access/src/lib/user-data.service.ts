import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { Endpoint } from '@atocha/menu-matriarch/shared/data-access';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UserDto } from '@atocha/menu-matriarch/data-access';
import { User, UserPreferences } from '@atocha/menu-matriarch/shared/util';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private _endpoint = Endpoint.users;

  constructor(private _dataService: DataService) {}

  getUser(uid: string): Observable<User | undefined> {
    return this._dataService.getOne<UserDto>(this._endpoint, uid);
  }

  getPreferences(uid: string): Observable<UserPreferences | undefined> {
    return this.getUser(uid).pipe(map((user) => user?.preferences));
  }

  async updatePreferences(
    { uid, preferences }: User,
    data: Partial<UserPreferences>
  ): Promise<void> {
    return this._dataService.update<UserDto>(this._endpoint, uid, {
      preferences: {
        ...preferences,
        ...data,
      },
    });
  }
}
