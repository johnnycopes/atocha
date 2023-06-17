import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import { Ingredient } from '@atocha/menu-matriarch/util';
import { IngredientDto, createIngredientDto } from './dtos/ingredient-dto';
import { BatchService } from './batch.service';
import { Endpoint } from './endpoint.enum';

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
    private _dataService: DataService
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
        this._batchService.getIngredientTypeUpdates({
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
        this._batchService.getIngredientTypeUpdates({
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

    batch.delete(Endpoint.ingredients, ingredient.id).updateMultiple(
      this._batchService.getIngredientTypeUpdates({
        ingredientId: ingredient.id,
        typeIdToRemoveFrom: ingredient.typeId,
      })
    );
    // TODO: update dish docs to remove ingredient

    await batch.commit();
  }
}
