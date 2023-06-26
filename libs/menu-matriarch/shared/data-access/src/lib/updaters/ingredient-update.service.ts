import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { BatchService } from './batch.service';
import { Endpoint } from '../endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class IngredientUpdateService {
  private readonly _endpoint = Endpoint.ingredients;

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
      endpoint: this._endpoint,
      key: 'dishIds',
      initialIds: initialIngredientIds,
      finalIds: finalIngredientIds,
      entityId,
    });
  }
}
