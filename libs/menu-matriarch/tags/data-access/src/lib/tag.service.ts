import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';

import { AuthService } from '@atocha/firebase/data-access';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { EditableTagData, TagDtoService } from './internal/tag-dto.service';

@Injectable({
  providedIn: 'root',
})
export class TagService implements IEntityService<Tag, EditableTagData> {
  constructor(
    private _authService: AuthService,
    private _tagDtoService: TagDtoService
  ) {}

  getOne(id: string): Observable<Tag | undefined> {
    return this._tagDtoService.getOne(id);
  }

  getMany(): Observable<Tag[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._tagDtoService.getAll(uid);
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
          const id = await this._tagDtoService.create(uid, tag);
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  async update(tag: Tag, data: EditableTagData): Promise<void> {
    return this._tagDtoService.update(tag, data);
  }

  async delete(tag: Tag): Promise<void> {
    return this._tagDtoService.delete(tag);
  }
}
