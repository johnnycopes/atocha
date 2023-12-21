import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BatchService, DtoService } from '@atocha/firebase/data-access';
import {
  DishUpdateService,
  IDtoService,
  Endpoint,
  TagUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import { Meal } from '@atocha/menu-matriarch/shared/util';
import { MealDto } from './meal-dto';
import { createMealDto } from '../create-meal-dto';

export type EditableMealData = Pick<
  MealDto,
  'name' | 'description' | 'dishIds' | 'tagIds'
>;

@Injectable({
  providedIn: 'root',
})
export class MealDtoService implements IDtoService<Meal, MealDto> {
  private readonly _endpoint = Endpoint.meals;

  constructor(
    private _batchService: BatchService,
    private _dtoService: DtoService<MealDto>,
    private _dishUpdateService: DishUpdateService,
    private _tagUpdateService: TagUpdateService
  ) {}

  getOne(id: string): Observable<MealDto | undefined> {
    return this._dtoService.getOne(this._endpoint, id);
  }

  getAll(uid: string): Observable<MealDto[]> {
    return this._dtoService.getMany(this._endpoint, uid);
  }

  async create(uid: string, meal: EditableMealData): Promise<string> {
    const id = this._dtoService.createId();
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
