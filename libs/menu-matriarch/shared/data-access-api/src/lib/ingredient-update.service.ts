import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { ApiService } from './api.service';
import { Endpoint } from './endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class IngredientUpdateService {
  constructor(private _batchService: ApiService) {}

  getUpdates({
    initialIngredientIds,
    finalIngredientIds,
    entityId,
  }: {
    initialIngredientIds: string[];
    finalIngredientIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._batchService.getBatchUpdates({
      endpoint: Endpoint.ingredients,
      key: 'dishIds',
      initialIds: initialIngredientIds,
      finalIds: finalIngredientIds,
      entityId,
    });
  }
}
