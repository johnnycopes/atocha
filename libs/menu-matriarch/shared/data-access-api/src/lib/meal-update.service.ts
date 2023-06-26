import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { ApiService, KeyToUpdate } from './api.service';
import { Endpoint } from './endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class MealUpdateService {
  constructor(private _batchService: ApiService) {}

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
