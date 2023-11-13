import { Injectable } from '@angular/core';

import { BatchService, BatchUpdate } from '@atocha/firebase/data-access';
import { Endpoint } from './types/endpoint.enum';
import { KeyToUpdate } from './key-to-update.type';

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
