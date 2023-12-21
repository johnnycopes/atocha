import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BatchService, DtoService } from '@atocha/firebase/data-access';
import {
  DishUpdateService,
  IDtoService,
  Endpoint,
  IngredientTypeUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import { Ingredient } from '@atocha/menu-matriarch/shared/util';
import { IngredientDto } from './ingredient-dto';
import { createIngredientDto } from '../create-ingredient-dto';

export type EditableIngredientData = Pick<
  IngredientDto,
  'name' | 'typeId' | 'dishIds'
>;

@Injectable({
  providedIn: 'root',
})
export class IngredientDtoService
  implements IDtoService<Ingredient, IngredientDto>
{
  private readonly _endpoint = Endpoint.ingredients;

  constructor(
    private _batchService: BatchService,
    private _dtoService: DtoService<IngredientDto>,
    private _dishUpdateService: DishUpdateService,
    private _ingredientTypeUpdateService: IngredientTypeUpdateService
  ) {}

  getOne(id: string): Observable<IngredientDto | undefined> {
    return this._dtoService.getOne(this._endpoint, id);
  }

  getAll(uid: string): Observable<IngredientDto[]> {
    return this._dtoService.getMany(this._endpoint, uid);
  }

  async create(
    uid: string,
    ingredient: EditableIngredientData
  ): Promise<string> {
    const id = this._dtoService.createId();
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

  async update(
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

  async delete(ingredient: Ingredient): Promise<void> {
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
