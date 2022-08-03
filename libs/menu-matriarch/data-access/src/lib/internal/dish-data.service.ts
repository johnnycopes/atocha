import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import {
  Dish,
  DishDto,
  Endpoint,
  createDishDto,
} from '@atocha/menu-matriarch/types';
import { BatchService } from './batch.service';

@Injectable({
  providedIn: 'root',
})
export class DishDataService {
  private _endpoint = Endpoint.dishes;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  getDish(id: string): Observable<DishDto | undefined> {
    return this._dataService.getOne<DishDto>(this._endpoint, id);
  }

  getDishes(uid: string): Observable<DishDto[]> {
    return this._dataService
      .getMany<DishDto>(this._endpoint, uid)
      .pipe(
        map((dishDtos) => sort(dishDtos, (dishDto) => lower(dishDto.name)))
      );
  }

  async createDish({
    uid,
    dish,
  }: {
    uid: string;
    dish: Partial<Omit<DishDto, 'id' | 'uid'>>;
  }): Promise<string> {
    const id = this._dataService.createId();
    const batch = this._batchService.createBatch();
    batch.set({
      endpoint: this._endpoint,
      id,
      data: createDishDto({ id, uid, ...dish }),
    });
    if (dish.tagIds) {
      batch.updateMultiple(
        this._batchService.getTagUpdates({
          key: 'dishIds',
          initialTagIds: [],
          finalTagIds: dish.tagIds,
          entityId: id,
        })
      );
    }
    await batch.commit();
    return id;
  }

  async updateDish(
    dish: Dish,
    data: Partial<Omit<DishDto, 'usages' | 'menus'>>
  ): Promise<void> {
    const batch = this._batchService.createBatch();
    batch.update({
      endpoint: this._endpoint,
      id: dish.id,
      data,
    });
    if (data.tagIds) {
      batch.updateMultiple(
        this._batchService.getTagUpdates({
          key: 'dishIds',
          initialTagIds: dish.tags.map((tag) => tag.id),
          finalTagIds: data.tagIds,
          entityId: dish.id,
        })
      );
    }
    await batch.commit();
  }

  async deleteDish(dish: Dish): Promise<void> {
    const batch = this._batchService.createBatch();
    batch.delete(this._endpoint, dish.id).updateMultiple([
      ...this._batchService.getMenuContentsUpdates({
        menuIds: dish.menuIds,
        dishIds: [dish.id],
        change: 'remove',
      }),
      ...this._batchService.getMealUpdates({
        key: 'dishIds',
        initialMealIds: dish.mealIds,
        finalMealIds: [],
        entityId: dish.id,
      }),
      ...this._batchService.getTagUpdates({
        key: 'dishIds',
        initialTagIds: dish.tags.map((tag) => tag.id),
        finalTagIds: [],
        entityId: dish.id,
      }),
    ]);
    await batch.commit();
  }
}
