import { Injectable } from '@angular/core';

import { uniqueDiff } from '@atocha/core/util';
import { Batch, BatchUpdate } from './batch';
import { FirestoreService } from './firestore.service';

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

export { BatchUpdate, BatchService };
