import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { BatchService, KeyToUpdate } from './batch.service';
import { Endpoint } from '../endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class MealUpdateService {
  constructor(private _batchService: BatchService) {}

  getUpdates({
    key,
    initialMealIds,
    finalMealIds,
    entityId,
  }: {
    key: Extract<'dishIds' | 'tagIds', KeyToUpdate>;
    initialMealIds: string[];
    finalMealIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._batchService.getBatchUpdates({
      endpoint: Endpoint.meals,
      key,
      initialIds: initialMealIds,
      finalIds: finalMealIds,
      entityId,
    });
  }
}
