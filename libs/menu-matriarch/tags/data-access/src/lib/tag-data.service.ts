import { Injectable } from '@angular/core';

import { BatchService, DataService } from '@atocha/firebase/data-access';
import {
  DishUpdateService,
  Endpoint,
  MealUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import {
  DtoService,
  TagDto,
  createTagDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
import { Tag } from '@atocha/menu-matriarch/shared/util';

export type EditableTagData = Pick<TagDto, 'name'>;

@Injectable({
  providedIn: 'root',
})
export class TagDataService implements DtoService<TagDto> {
  private _endpoint = Endpoint.tags;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService<TagDto>,
    private _dishUpdateService: DishUpdateService,
    private _mealUpdateService: MealUpdateService
  ) {}

  getOne(id: string) {
    return this._dataService.getOne(this._endpoint, id);
  }

  getMultiple(uid: string) {
    return this._dataService.getMany(this._endpoint, uid);
  }

  async create(uid: string, tag: EditableTagData) {
    const id = this._dataService.createId();

    await this._dataService.create(
      this._endpoint,
      id,
      createTagDto({ id, uid, ...tag })
    );

    return id;
  }

  async update(tag: Tag, data: EditableTagData) {
    return this._dataService.update(this._endpoint, tag.id, data);
  }

  async delete(tag: Tag) {
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
