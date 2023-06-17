import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { lower, sort } from '@atocha/core/util';
import { IngredientType } from '@atocha/menu-matriarch/util';
import {
  IngredientTypeDto,
  createIngredientTypeDto,
} from './dtos/ingredient-type-dto';
import { BatchService } from './batch.service';
import { Endpoint } from './endpoint.enum';

export type EditableIngredientTypeData = Pick<
  IngredientTypeDto,
  'name' | 'ingredientIds'
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

    await this._dataService.create<IngredientTypeDto>(
      this._endpoint,
      id,
      createIngredientTypeDto({ id, uid, ...ingredientType })
    );

    return id;
  }

  async updateIngredientType(
    ingredientType: IngredientType,
    updates: EditableIngredientTypeData
  ): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.update({
      endpoint: Endpoint.ingredientTypes,
      id: ingredientType.id,
      data: updates,
    });
    // TODO: update ingredientType doc and relevant ingredients docs

    await batch.commit();
  }

  async deleteIngredientType(ingredientType: IngredientType): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(Endpoint.ingredientTypes, ingredientType.id);
    // TODO: update ingredients docs to remove ingredient

    await batch.commit();
  }
}
