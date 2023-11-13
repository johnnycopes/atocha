import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';

import { AuthService } from '@atocha/firebase/data-access';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { EntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { EditableTagData, TagDataService } from './internal/tag-data.service';

@Injectable({
  providedIn: 'root',
})
export class TagService implements EntityService<Tag, EditableTagData> {
  constructor(
    private _authService: AuthService,
    private _tagDataService: TagDataService
  ) {}

  getOne(id: string): Observable<Tag | undefined> {
    return this._tagDataService.getOne(id);
  }

  getMany(): Observable<Tag[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._tagDataService.getMany(uid);
        }
        return of([]);
      })
    );
  }

  create(tag: EditableTagData): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._tagDataService.create(uid, tag);
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  async update(tag: Tag, data: EditableTagData): Promise<void> {
    return this._tagDataService.update(tag, data);
  }

  async delete(tag: Tag): Promise<void> {
    return this._tagDataService.delete(tag);
  }
}
