import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, of } from 'rxjs';

import { Tag } from '@atocha/menu-matriarch/shared/util';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { EditableTagData, TagDtoService } from './internal/tag-dto.service';

@Injectable({
  providedIn: 'root',
})
export class TagService implements IEntityService<Tag, EditableTagData> {
  private _tagDtoService = inject(TagDtoService);

  getOne(id: string): Observable<Tag | undefined> {
    return this._tagDtoService.getOne(id);
  }

  getAll(): Observable<Tag[]> {
    return this._tagDtoService.getAll();
  }

  create(tag: EditableTagData): Observable<string | undefined> {
    return from(this._tagDtoService.create(tag)).pipe(
      catchError(() => of(undefined))
    );
  }

  async update(tag: Tag, data: EditableTagData): Promise<void> {
    return this._tagDtoService.update(tag, data);
  }

  async delete(tag: Tag): Promise<void> {
    return this._tagDtoService.delete(tag);
  }
}
