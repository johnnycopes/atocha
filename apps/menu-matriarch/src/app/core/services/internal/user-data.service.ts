import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDto } from '@models/dtos/user-dto.interface';
import { Endpoint } from '@models/endpoint.enum';
import { User } from '@models/user.interface';
import { UserPreferences } from '@models/user-preferences.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _endpoint = Endpoint.users;

  constructor(private _dataService: DataService) { }

  public getUser(uid: string): Observable<User | undefined> {
    return this._dataService.getOne<UserDto>(this._endpoint, uid);
  }

  public getPreferences(uid: string): Observable<UserPreferences | undefined> {
    return this.getUser(uid).pipe(
      map(user => user?.preferences),
    );
  }

  public updatePreferences(user: User, data: Partial<UserPreferences>): Promise<void> {
    const { uid, preferences } = user;
    return this._dataService.update<UserDto>(
      this._endpoint,
      uid,
      { preferences: {
        ...preferences,
        ...data,
      }}
    );
  }
}
