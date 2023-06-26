import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import {
  BatchService,
  DishUpdateService,
  Endpoint,
  MealUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-updaters';
import {
  TagDto,
  createTagDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
import { Tag } from '@atocha/menu-matriarch/shared/util';

export type EditableTagData = Pick<TagDto, 'name'>;

@Injectable({
  providedIn: 'root',
})
export class TagDataService {
  private _endpoint = Endpoint.tags;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService,
    private _dishUpdateService: DishUpdateService,
    private _mealUpdateService: MealUpdateService
  ) {}

  getTag(id: string): Observable<Tag | undefined> {
    return this._dataService.getOne<TagDto>(this._endpoint, id);
  }

  getTags(uid: string): Observable<Tag[]> {
    return this._dataService
      .getMany<TagDto>(this._endpoint, uid)
      .pipe(map((tags) => sort(tags, ({ name }) => lower(name))));
  }

  async createTag(uid: string, tag: EditableTagData): Promise<string> {
    const id = this._dataService.createId();

    await this._dataService.create<TagDto>(
      this._endpoint,
      id,
      createTagDto({ id, uid, ...tag })
    );

    return id;
  }

  async updateTag(tag: Tag, data: EditableTagData): Promise<void> {
    return this._dataService.update<TagDto>(this._endpoint, tag.id, data);
  }

  async deleteTag(tag: Tag): Promise<void> {
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
