import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DtoService } from '@atocha/firebase/data-access';
import { Endpoint } from '@atocha/menu-matriarch/shared/data-access-api';
import { User, UserPreferences } from '@atocha/menu-matriarch/shared/util';
import { UserDto } from './user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserDtoService {
  private readonly _endpoint = Endpoint.users;

  constructor(private _dataService: DtoService<UserDto>) {}

  getUser(uid: string): Observable<User | undefined> {
    return this._dataService.getOne(this._endpoint, uid);
  }

  getPreferences(uid: string): Observable<UserPreferences | undefined> {
    return this.getUser(uid).pipe(map((user) => user?.preferences));
  }

  async updatePreferences(
    { uid, preferences }: User,
    data: Partial<UserPreferences>
  ): Promise<void> {
    return this._dataService.update(this._endpoint, uid, {
      preferences: {
        ...preferences,
        ...data,
      },
    });
  }
}
