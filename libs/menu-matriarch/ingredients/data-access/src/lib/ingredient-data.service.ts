import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import {
  BatchService,
  DishUpdateService,
  Endpoint,
  IngredientDto,
  IngredientTypeUpdateService,
  IngredientUpdateService,
  createIngredientDto,
} from '@atocha/menu-matriarch/shared/data-access';
import { Ingredient } from '@atocha/menu-matriarch/shared/util';

export type EditableIngredientData = Pick<
  IngredientDto,
  'name' | 'typeId' | 'dishIds'
>;

@Injectable({
  providedIn: 'root',
})
export class IngredientDataService {
  private _endpoint = Endpoint.ingredients;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService,
    private _dishUpdateService: DishUpdateService,
    private _ingredientTypeUpdateService: IngredientTypeUpdateService
  ) {}

  getIngredient(id: string): Observable<IngredientDto | undefined> {
    return this._dataService.getOne<IngredientDto>(this._endpoint, id);
  }

  getIngredients(uid: string): Observable<IngredientDto[]> {
    return this._dataService
      .getMany<IngredientDto>(this._endpoint, uid)
      .pipe(
        map((ingredientDtos) =>
          sort(ingredientDtos, (ingredientDto) => lower(ingredientDto.name))
        )
      );
  }

  async createIngredient(
    uid: string,
    ingredient: EditableIngredientData
  ): Promise<string> {
    const id = this._dataService.createId();
    const batch = this._batchService.createBatch();

    batch
      .set({
        endpoint: this._endpoint,
        id,
        data: createIngredientDto({ id, uid, ...ingredient }),
      })
      .updateMultiple(
        this._ingredientTypeUpdateService.getUpdates({
          ingredientId: id,
          typeIdToAddTo: ingredient.typeId,
        })
      );

    await batch.commit();
    return id;
  }

  async updateIngredient(
    ingredient: Ingredient,
    updates: EditableIngredientData
  ): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.update({
      endpoint: Endpoint.ingredients,
      id: ingredient.id,
      data: updates,
    });

    if (updates.typeId) {
      batch.updateMultiple(
        this._ingredientTypeUpdateService.getUpdates({
          ingredientId: ingredient.id,
          typeIdToRemoveFrom: ingredient.typeId,
          typeIdToAddTo: updates.typeId,
        })
      );
    }

    await batch.commit();
  }

  async deleteIngredient(ingredient: Ingredient): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(Endpoint.ingredients, ingredient.id).updateMultiple([
      ...this._ingredientTypeUpdateService.getUpdates({
        ingredientId: ingredient.id,
        typeIdToRemoveFrom: ingredient.typeId,
      }),
      ...this._dishUpdateService.getUpdates({
        key: 'ingredientIds',
        initialDishIds: ingredient.dishIds,
        finalDishIds: [],
        entityId: ingredient.id,
      }),
    ]);

    await batch.commit();
  }
}
