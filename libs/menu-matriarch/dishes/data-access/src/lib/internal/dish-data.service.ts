import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BatchService, DataService } from '@atocha/firebase/data-access';
import {
  IDtoService,
  Endpoint,
  IngredientUpdateService,
  MealUpdateService,
  MenuUpdateService,
  TagUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import { Dish } from '@atocha/menu-matriarch/shared/util';
import { DishDto } from './dish-dto';
import { createDishDto } from '../create-dish-dto';

export type EditableDishData = Pick<
  DishDto,
  | 'name'
  | 'description'
  | 'link'
  | 'type'
  | 'ingredientIds'
  | 'tagIds'
  | 'notes'
>;

@Injectable({
  providedIn: 'root',
})
export class DishDataService implements IDtoService<Dish, DishDto> {
  private readonly _endpoint = Endpoint.dishes;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService<DishDto>,
    private _mealUpdateService: MealUpdateService,
    private _menuUpdateService: MenuUpdateService,
    private _ingredientUpdateService: IngredientUpdateService,
    private _tagUpdateService: TagUpdateService
  ) {}

  getOne(id: string): Observable<DishDto | undefined> {
    return this._dataService.getOne(this._endpoint, id);
  }

  getMany(uid: string): Observable<DishDto[]> {
    return this._dataService.getMany(this._endpoint, uid);
  }

  async create(uid: string, dish: EditableDishData): Promise<string> {
    const id = this._dataService.createId();
    const batch = this._batchService.createBatch();

    batch.set({
      endpoint: this._endpoint,
      id,
      data: createDishDto({ id, uid, ...dish }),
    });

    if (dish.ingredientIds) {
      batch.updateMultiple(
        this._ingredientUpdateService.getUpdates({
          initialIngredientIds: [],
          finalIngredientIds: dish.ingredientIds,
          entityId: id,
        })
      );
    }

    if (dish.tagIds) {
      batch.updateMultiple(
        this._tagUpdateService.getUpdates({
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

  async update(dish: Dish, data: EditableDishData): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.update({
      endpoint: this._endpoint,
      id: dish.id,
      data,
    });

    if (data.ingredientIds) {
      batch.updateMultiple(
        this._ingredientUpdateService.getUpdates({
          initialIngredientIds: dish.ingredients.map(({ id }) => id),
          finalIngredientIds: data.ingredientIds,
          entityId: dish.id,
        })
      );
    }

    if (data.tagIds) {
      batch.updateMultiple(
        this._tagUpdateService.getUpdates({
          key: 'dishIds',
          initialTagIds: dish.tags.map(({ id }) => id),
          finalTagIds: data.tagIds,
          entityId: dish.id,
        })
      );
    }

    await batch.commit();
  }

  async delete(dish: Dish): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, dish.id).updateMultiple([
      ...this._menuUpdateService.getContentsUpdates({
        menuIds: dish.menuIds,
        dishIds: [dish.id],
        change: 'remove',
      }),
      ...this._mealUpdateService.getUpdates({
        key: 'dishIds',
        initialMealIds: dish.mealIds,
        finalMealIds: [],
        entityId: dish.id,
      }),
      ...this._ingredientUpdateService.getUpdates({
        initialIngredientIds: dish.ingredients.map(({ id }) => id),
        finalIngredientIds: [],
        entityId: dish.id,
      }),
      ...this._tagUpdateService.getUpdates({
        key: 'dishIds',
        initialTagIds: dish.tags.map(({ id }) => id),
        finalTagIds: [],
        entityId: dish.id,
      }),
    ]);

    await batch.commit();
  }
}
