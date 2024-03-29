import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BatchService, DtoService } from '@atocha/firebase/data-access';
import {
  DishUpdateService,
  IDtoService,
  Endpoint,
  MealUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { TagDto } from './tag-dto';
import { createTagDto } from '../create-tag-dto';

export type EditableTagData = Pick<TagDto, 'name'>;

@Injectable({
  providedIn: 'root',
})
export class TagDtoService implements IDtoService<Tag, TagDto> {
  private readonly _endpoint = Endpoint.tags;

  constructor(
    private _batchService: BatchService,
    private _dtoService: DtoService<TagDto>,
    private _dishUpdateService: DishUpdateService,
    private _mealUpdateService: MealUpdateService
  ) {}

  getOne(id: string): Observable<TagDto | undefined> {
    return this._dtoService.getOne(this._endpoint, id);
  }

  getAll(uid: string): Observable<TagDto[]> {
    return this._dtoService.getAll(this._endpoint, uid);
  }

  async create(uid: string, tag: EditableTagData): Promise<string> {
    const id = this._dtoService.createId();

    await this._dtoService.create(
      this._endpoint,
      id,
      createTagDto({ id, uid, ...tag })
    );

    return id;
  }

  async update(tag: Tag, data: EditableTagData): Promise<void> {
    return this._dtoService.update(this._endpoint, tag.id, data);
  }

  async delete(tag: Tag): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, tag.id).updateMultiple([
      ...this._mealUpdateService.getUpdates({
        key: 'tagIds',
        initialMealIds: tag.mealIds,
        finalMealIds: [],
        entityId: tag.id,
      }),
      ...this._dishUpdateService.getUpdates({
        key: 'tagIds',
        initialDishIds: tag.dishIds,
        finalDishIds: [],
        entityId: tag.id,
      }),
    ]);

    await batch.commit();
  }
}
