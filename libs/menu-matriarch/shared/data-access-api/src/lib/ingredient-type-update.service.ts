import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { BatchService } from './batch.service';
import { Endpoint } from './endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeUpdateService {
  constructor(private _batchService: BatchService) {}

  getUpdates({
    ingredientId,
    typeIdToRemoveFrom,
    typeIdToAddTo,
  }: {
    ingredientId: string;
    typeIdToRemoveFrom?: string;
    typeIdToAddTo?: string;
  }): BatchUpdate[] {
    const endpoint = Endpoint.ingredientTypes;
    const updates: BatchUpdate[] = [];

    if (typeIdToRemoveFrom) {
      updates.push({
        endpoint,
        id: typeIdToRemoveFrom,
        data: {
          ingredientIds: this._batchService.removeFromArray(ingredientId),
        },
      });
    }

    if (typeIdToAddTo) {
      updates.push({
        endpoint,
        id: typeIdToAddTo,
        data: {
          ingredientIds: this._batchService.addToArray(ingredientId),
        },
      });
    }

    return updates;
  }
}
