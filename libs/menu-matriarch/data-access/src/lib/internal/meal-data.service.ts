import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import {
  MealDto,
  Endpoint,
  Meal,
  createMealDto,
} from '@atocha/menu-matriarch/types';
import { BatchService } from './batch.service';

@Injectable({
  providedIn: 'root',
})
export class MealDataService {
  private _endpoint = Endpoint.meals;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  getMeal(id: string): Observable<MealDto | undefined> {
    return this._dataService.getOne<MealDto>(this._endpoint, id);
  }

  getMeals(uid: string): Observable<MealDto[]> {
    return this._dataService
      .getMany<MealDto>(this._endpoint, uid)
      .pipe(
        map((mealDtos) => sort(mealDtos, (mealDto) => lower(mealDto.name)))
      );
  }

  async createMeal(
    uid: string,
    meal: Partial<Omit<MealDto, 'id' | 'uid'>>
  ): Promise<string> {
    const id = this._dataService.createId();
    const batch = this._batchService.createBatch();
    batch.set({
      endpoint: this._endpoint,
      id,
      data: createMealDto({ id, uid, ...meal }),
    });
    if (meal.dishIds) {
      batch.updateMultiple(
        this._batchService.getDishUpdates({
          key: 'mealIds',
          initialDishIds: [],
          finalDishIds: meal.dishIds,
          entityId: id,
        })
      );
    }
    if (meal.tagIds) {
      batch.updateMultiple(
        this._batchService.getTagUpdates({
          key: 'mealIds',
          initialTagIds: [],
          finalTagIds: meal.tagIds,
          entityId: id,
        })
      );
    }
    await batch.commit();
    return id;
  }

  async updateMeal(meal: Meal, data: Partial<MealDto>): Promise<void> {
    const batch = this._batchService.createBatch();
    batch.update({
      endpoint: this._endpoint,
      id: meal.id,
      data,
    });
    if (data.dishIds) {
      batch.updateMultiple(
        this._batchService.getDishUpdates({
          key: 'mealIds',
          initialDishIds: meal.dishes.map((dish) => dish.id),
          finalDishIds: data.dishIds,
          entityId: meal.id,
        })
      );
    }
    if (data.tagIds) {
      batch.updateMultiple(
        this._batchService.getTagUpdates({
          key: 'mealIds',
          initialTagIds: meal.tags.map((tag) => tag.id),
          finalTagIds: data.tagIds,
          entityId: meal.id,
        })
      );
    }
    await batch.commit();
  }

  async deleteMeal(meal: Meal): Promise<void> {
    const batch = this._batchService.createBatch();
    batch.delete(this._endpoint, meal.id).updateMultiple([
      ...this._batchService.getDishUpdates({
        key: 'mealIds',
        initialDishIds: meal.dishes.map((dish) => dish.id),
        finalDishIds: [],
        entityId: meal.id,
      }),
      ...this._batchService.getTagUpdates({
        key: 'mealIds',
        initialTagIds: meal.tags.map((tag) => tag.id),
        finalTagIds: [],
        entityId: meal.id,
      }),
    ]);
    await batch.commit();
  }
}
