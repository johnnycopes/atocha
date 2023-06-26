import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { BatchService } from './batch.service';
import { Endpoint } from '../endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class MealUpdateService {
  private readonly _endpoint = Endpoint.meals;

  constructor(private _batchService: BatchService) {}

  getUpdates({
    key,
    initialMealIds,
    finalMealIds,
    entityId,
  }: {
    key: 'dishIds' | 'tagIds';
    initialMealIds: string[];
    finalMealIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._batchService.getBatchUpdates({
      endpoint: this._endpoint,
      key,
      initialIds: initialMealIds,
      finalIds: finalMealIds,
      entityId,
    });
  }
}
