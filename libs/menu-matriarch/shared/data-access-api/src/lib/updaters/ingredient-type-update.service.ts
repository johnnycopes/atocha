import { Injectable, inject } from '@angular/core';

import { BatchService, BatchUpdate } from '@atocha/firebase/data-access';
import { Endpoint } from '../types/endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeUpdateService {
  private _batchService = inject(BatchService);

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
