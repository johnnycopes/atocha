import { Injectable } from '@angular/core';

import { Batch, BatchService, BatchUpdate } from '@atocha/core/data-access';
import { uniqueDiff } from '@atocha/core/util';

export type KeyToUpdate = 'mealIds' | 'dishIds' | 'ingredientIds' | 'tagIds';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _batchService: BatchService) {}

  createBatch(): Batch {
    return this._batchService.createBatch();
  }

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
        data: { [key]: this.addToArray(entityId) },
      })),
      ...removed.map((id) => ({
        endpoint,
        id,
        data: { [key]: this.removeFromArray(entityId) },
      })),
    ];

    return batchUpdates;
  }

  addToArray(...ids: string[]): string[] {
    return this._batchService.addToArray(...ids);
  }

  removeFromArray(...ids: string[]): string[] {
    return this._batchService.removeFromArray(...ids);
  }

  changeCounter(value: number): number {
    return this._batchService.changeCounter(value);
  }
}
