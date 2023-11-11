import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';

import { AuthService } from '@atocha/firebase/data-access';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { EditableTagData, TagDataService } from './tag-data.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(
    private _authService: AuthService,
    private _tagDataService: TagDataService
  ) {}

  getTag(id: string): Observable<Tag | undefined> {
    return this._tagDataService.getOne(id);
  }

  getTags(): Observable<Tag[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._tagDataService.getMultiple(uid);
        }
        return of([]);
      })
    );
  }

  createTag(tag: EditableTagData): Observable<string | undefined> {
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

  async updateTag(tag: Tag, data: EditableTagData): Promise<void> {
    return this._tagDataService.update(tag, data);
  }

  async deleteTag(tag: Tag): Promise<void> {
    return this._tagDataService.delete(tag);
  }
}
