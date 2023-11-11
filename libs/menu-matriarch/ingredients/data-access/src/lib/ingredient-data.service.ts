import { Injectable } from '@angular/core';

import { BatchService, DataService } from '@atocha/firebase/data-access';
import {
  DishUpdateService,
  Endpoint,
  IngredientTypeUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import {
  DtoService,
  IngredientDto,
  createIngredientDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
import { Ingredient } from '@atocha/menu-matriarch/shared/util';

export type EditableIngredientData = Pick<
  IngredientDto,
  'name' | 'typeId' | 'dishIds'
>;

@Injectable({
  providedIn: 'root',
})
export class IngredientDataService implements DtoService<IngredientDto> {
  private _endpoint = Endpoint.ingredients;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService<IngredientDto>,
    private _dishUpdateService: DishUpdateService,
    private _ingredientTypeUpdateService: IngredientTypeUpdateService
  ) {}

  getOne(id: string) {
    return this._dataService.getOne(this._endpoint, id);
  }

  getMultiple(uid: string) {
    return this._dataService.getMany(this._endpoint, uid);
  }

  async create(uid: string, ingredient: EditableIngredientData) {
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

  async update(ingredient: Ingredient, updates: EditableIngredientData) {
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

  async delete(ingredient: Ingredient) {
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
