import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import {
  Tag,
  TagDto,
  Endpoint,
  createTagDto,
} from '@atocha/menu-matriarch/util';
import { BatchService } from './batch.service';

@Injectable({
  providedIn: 'root',
})
export class TagDataService {
  private _endpoint = Endpoint.tags;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  getTag(id: string): Observable<TagDto | undefined> {
    return this._dataService.getOne<TagDto>(this._endpoint, id);
  }

  getTags(uid: string): Observable<TagDto[]> {
    return this._dataService
      .getMany<TagDto>(this._endpoint, uid)
      .pipe(map((tags) => sort(tags, ({ name }) => lower(name))));
  }

  async createTag({
    uid,
    tag,
  }: {
    uid: string;
    tag: Partial<Omit<TagDto, 'id' | 'uid'>>;
  }): Promise<string> {
    const id = this._dataService.createId();

    await this._dataService.create<TagDto>(
      this._endpoint,
      id,
      createTagDto({ id, uid, ...tag })
    );

    return id;
  }

  updateTag(id: string, data: Partial<TagDto>): Promise<void> {
    return this._dataService.update<TagDto>(this._endpoint, id, data);
  }

  async deleteTag(tag: Tag): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, tag.id).updateMultiple([
      ...this._batchService.getMealUpdates({
        key: 'tagIds',
        initialMealIds: tag.mealIds,
        finalMealIds: [],
        entityId: tag.id,
      }),
      ...this._batchService.getDishUpdates({
        key: 'tagIds',
        initialDishIds: tag.dishIds,
        finalDishIds: [],
        entityId: tag.id,
      }),
    ]);

    await batch.commit();
  }
}
