import { Injectable } from '@angular/core';

import { Batch, BatchUpdate, FirestoreService } from '@atocha/core/data-access';
import { uniqueDiff } from '@atocha/core/util';

export type KeyToUpdate = 'mealIds' | 'dishIds' | 'ingredientIds' | 'tagIds';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private _firestoreService: FirestoreService) {}

  createBatch(): Batch {
    return new Batch(this._firestoreService.createBatch(), (endpoint, id) =>
      this._firestoreService.getDocRef(endpoint, id)
    );
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
    return this._firestoreService.addToArray(...ids);
  }

  removeFromArray(...ids: string[]): string[] {
    return this._firestoreService.removeFromArray(...ids);
  }

  changeCounter(value: number): number {
    return this._firestoreService.changeCounter(value);
  }
}
