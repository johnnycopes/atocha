import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, of } from 'rxjs';

import { SupabaseService } from '@atocha/supabase/data-access';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { EditableTagData, TagDtoService } from './internal/tag-dto.service';

@Injectable({
  providedIn: 'root',
})
export class TagService implements IEntityService<Tag, EditableTagData> {
  private _supabase = inject(SupabaseService);
  private _tagDtoService = inject(TagDtoService);

  getOne(id: string): Observable<Tag | undefined> {
    return this._tagDtoService.getOne(id);
  }

  getAll(): Observable<Tag[]> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        if (session) {
          return this._tagDtoService.getAll(session.user.id);
        }
        return of([]);
      })
    );
  }

  create(tag: EditableTagData): Observable<string | undefined> {
    return this._supabase.session$.pipe(
      first(),
      concatMap(async (session) => {
        if (session) {
          const id = await this._tagDtoService.create(session.user.id, tag);
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
