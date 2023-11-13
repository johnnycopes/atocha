import { Injectable } from '@angular/core';

import { BatchService, BatchUpdate } from '@atocha/firebase/data-access';
import { Endpoint } from '../types/endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class IngredientUpdateService {
  constructor(private _batchService: BatchService) {}

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
