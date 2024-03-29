import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BatchService, DtoService } from '@atocha/firebase/data-access';
import {
  IDtoService,
  Endpoint,
  UserUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import { IngredientType } from '@atocha/menu-matriarch/shared/util';
import { IngredientTypeDto } from './ingredient-type-dto';
import { createIngredientTypeDto } from '../create-ingredient-type-dto';

export type EditableIngredientTypeData = Partial<
  Pick<IngredientTypeDto, 'name' | 'ingredientIds'>
>;

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeDtoService
  implements IDtoService<IngredientType, IngredientTypeDto>
{
  private readonly _endpoint = Endpoint.ingredientTypes;

  constructor(
    private _batchService: BatchService,
    private _dtoService: DtoService<IngredientTypeDto>,
    private _userUpdateService: UserUpdateService
  ) {}

  getOne(id: string): Observable<IngredientTypeDto | undefined> {
    return this._dtoService.getOne(this._endpoint, id);
  }

  getAll(uid: string): Observable<IngredientTypeDto[]> {
    return this._dtoService.getAll(this._endpoint, uid);
  }

  async create(
    uid: string,
    ingredientType: EditableIngredientTypeData
  ): Promise<string> {
    const id = this._dtoService.createId();
    const batch = this._batchService.createBatch();

    batch
      .set({
        endpoint: this._endpoint,
        id,
        data: createIngredientTypeDto({ id, uid, ...ingredientType }),
      })
      .update(
        this._userUpdateService.getUpdate({
          uid,
          ingredientTypeIdToAdd: id,
        })
      );

    await batch.commit();
    return id;
  }

  async update(
    ingredientType: IngredientType,
    updates: EditableIngredientTypeData
  ): Promise<void> {
    return this._dtoService.update(this._endpoint, ingredientType.id, updates);
  }

  async delete(ingredientType: IngredientType): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, ingredientType.id).update(
      this._userUpdateService.getUpdate({
        uid: ingredientType.uid,
        ingredientTypeIdToDelete: ingredientType.id,
      })
    );

    await batch.commit();
  }
}
