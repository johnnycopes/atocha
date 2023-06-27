import { Injectable } from '@angular/core';

import { BatchService, BatchUpdate } from '@atocha/core/data-access';
import { uniqueDiff } from '@atocha/core/util';

export type KeyToUpdate = 'mealIds' | 'dishIds' | 'ingredientIds' | 'tagIds';

@Injectable({
  providedIn: 'root',
})
export class BatchUpdateService {
  constructor(private _batchService: BatchService) {}

  getBatchUpdates({
    endpoint,
    key,
    initialIds,
    finalIds,
    entityId,
  }: {
    endpoint: string;
    key: KeyToUpdate;
    initialIds: string[];
    finalIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    const { added, removed } = uniqueDiff(initialIds, finalIds);
    const batchUpdates: BatchUpdate[] = [
      ...added.map((id) => ({
        endpoint,
        id,
        data: { [key]: this._batchService.addToArray(entityId) },
      })),
      ...removed.map((id) => ({
        endpoint,
        id,
        data: { [key]: this._batchService.removeFromArray(entityId) },
      })),
    ];

    return batchUpdates;
  }
}
