import { Injectable } from '@angular/core';

import { Batch, BatchSet, BatchUpdate } from './firestore/batch';
import { FirestoreService } from './firestore/firestore.service';
import { uniqueDiff } from './batch/unique-diff';

@Injectable({
  providedIn: 'root',
})
class BatchService {
  constructor(private _firestoreService: FirestoreService) {}

  createBatch(): Batch {
    return new Batch(this._firestoreService.createBatch(), (endpoint, id) =>
      this._firestoreService.getDocRef(endpoint, id)
    );
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

  getBatchUpdates<T extends string>({
    endpoint,
    key,
    initialIds,
    finalIds,
    entityId,
  }: {
    endpoint: string;
    key: T;
    initialIds: string[];
    finalIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    const { added, removed } = uniqueDiff(initialIds, finalIds);
    const batchUpdates: BatchUpdate[] = [
      ...added.map((id) => ({
        endpoint,
        id,
        data: { [key]: this._firestoreService.addToArray(entityId) },
      })),
      ...removed.map((id) => ({
        endpoint,
        id,
        data: { [key]: this._firestoreService.removeFromArray(entityId) },
      })),
    ];

    return batchUpdates;
  }
}

export { BatchSet, BatchUpdate, BatchService };
