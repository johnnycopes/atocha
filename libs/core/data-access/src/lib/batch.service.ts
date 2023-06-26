import { Injectable } from '@angular/core';

import { Batch } from './batch';
import { FirestoreService } from './firestore.service';

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
