import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import { IngredientType } from '@atocha/menu-matriarch/shared/util';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  BatchService,
  Endpoint,
  IngredientTypeDto,
  createIngredientTypeDto,
} from '@atocha/menu-matriarch/data-access';

export type EditableIngredientTypeData = Partial<
  Pick<IngredientTypeDto, 'name' | 'ingredientIds'>
>;

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeDataService {
  private _endpoint = Endpoint.ingredientTypes;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  getIngredientType(id: string): Observable<IngredientTypeDto | undefined> {
    return this._dataService.getOne<IngredientTypeDto>(this._endpoint, id);
  }

  getIngredientTypes(uid: string): Observable<IngredientTypeDto[]> {
    return this._dataService
      .getMany<IngredientTypeDto>(this._endpoint, uid)
      .pipe(
        map((ingredientTypeDtos) =>
          sort(ingredientTypeDtos, (ingredientTypeDto) =>
            lower(ingredientTypeDto.name)
          )
        )
      );
  }

  async createIngredientType(
    uid: string,
    ingredientType: EditableIngredientTypeData
  ): Promise<string> {
    const id = this._dataService.createId();
    const batch = this._batchService.createBatch();

    batch
      .set({
        endpoint: this._endpoint,
        id,
        data: createIngredientTypeDto({ id, uid, ...ingredientType }),
      })
      .update(
        this._batchService.getUserUpdate({
          uid,
          ingredientTypeIdToAdd: id,
        })
      );

    await batch.commit();
    return id;
  }

  async updateIngredientType(
    ingredientType: IngredientType,
    updates: EditableIngredientTypeData
  ): Promise<void> {
    return this._dataService.update<IngredientTypeDto>(
      this._endpoint,
      ingredientType.id,
      updates
    );
  }

  async deleteIngredientType(ingredientType: IngredientType): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, ingredientType.id).update(
      this._batchService.getUserUpdate({
        uid: ingredientType.uid,
        ingredientTypeIdToDelete: ingredientType.id,
      })
    );

    await batch.commit();
  }
}
