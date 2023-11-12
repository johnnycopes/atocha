import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BatchService, DataService } from '@atocha/firebase/data-access';
import {
  DishUpdateService,
  Endpoint,
  TagUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import {
  DtoService,
  MealDto,
  createMealDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
import { Meal } from '@atocha/menu-matriarch/shared/util';

export type EditableMealData = Pick<
  MealDto,
  'name' | 'description' | 'dishIds' | 'tagIds'
>;

@Injectable({
  providedIn: 'root',
})
export class MealDataService implements DtoService<Meal, MealDto> {
  private _endpoint = Endpoint.meals;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService<MealDto>,
    private _dishUpdateService: DishUpdateService,
    private _tagUpdateService: TagUpdateService
  ) {}

  getOne(id: string): Observable<MealDto | undefined> {
    return this._dataService.getOne(this._endpoint, id);
  }

  getMany(uid: string): Observable<MealDto[]> {
    return this._dataService.getMany(this._endpoint, uid);
  }

  async create(uid: string, meal: EditableMealData): Promise<string> {
    const id = this._dataService.createId();
    const batch = this._batchService.createBatch();

    batch.set({
      endpoint: this._endpoint,
      id,
      data: createMealDto({ id, uid, ...meal }),
    });
    if (meal.dishIds) {
      batch.updateMultiple(
        this._dishUpdateService.getUpdates({
          key: 'mealIds',
          initialDishIds: [],
          finalDishIds: meal.dishIds,
          entityId: id,
        })
      );
    }
    if (meal.tagIds) {
      batch.updateMultiple(
        this._tagUpdateService.getUpdates({
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

  async update(meal: Meal, data: EditableMealData): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.update({
      endpoint: this._endpoint,
      id: meal.id,
      data,
    });
    if (data.dishIds) {
      batch.updateMultiple(
        this._dishUpdateService.getUpdates({
          key: 'mealIds',
          initialDishIds: meal.dishes.map(({ id }) => id),
          finalDishIds: data.dishIds,
          entityId: meal.id,
        })
      );
    }
    if (data.tagIds) {
      batch.updateMultiple(
        this._tagUpdateService.getUpdates({
          key: 'mealIds',
          initialTagIds: meal.tags.map(({ id }) => id),
          finalTagIds: data.tagIds,
          entityId: meal.id,
        })
      );
    }

    await batch.commit();
  }

  async delete(meal: Meal): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, meal.id).updateMultiple([
      ...this._dishUpdateService.getUpdates({
        key: 'mealIds',
        initialDishIds: meal.dishes.map(({ id }) => id),
        finalDishIds: [],
        entityId: meal.id,
      }),
      ...this._tagUpdateService.getUpdates({
        key: 'mealIds',
        initialTagIds: meal.tags.map(({ id }) => id),
        finalTagIds: [],
        entityId: meal.id,
      }),
    ]);

    await batch.commit();
  }
}
