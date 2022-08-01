import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { lower, sort } from '@atocha/core/util';
import {
  Tag,
  TagDto,
  Endpoint,
  createTagDto,
} from '@atocha/menu-matriarch/types';
import { BatchService } from './batch.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class TagDataService {
  private _endpoint = Endpoint.tags;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  public getTag(id: string): Observable<TagDto | undefined> {
    return this._dataService.getOne<TagDto>(this._endpoint, id);
  }

  public getTags(uid: string): Observable<TagDto[]> {
    return this._dataService
      .getMany<TagDto>(this._endpoint, uid)
      .pipe(map((tags) => sort(tags, (tag) => lower(tag.name))));
  }

  public async createTag({
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

  public updateTag(id: string, data: Partial<TagDto>): Promise<void> {
    return this._dataService.update<TagDto>(this._endpoint, id, data);
  }

  public async deleteTag(tag: Tag): Promise<void> {
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
