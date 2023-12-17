import {
  DocumentReference,
  FieldValue,
  WriteBatch,
} from '@angular/fire/firestore';

export interface BatchSet<T> {
  endpoint: string;
  id: string;
  data: T;
}

export type BatchUpdate = BatchSet<{
  [x: string]: FieldValue | Partial<unknown> | undefined;
}>;

export class Batch {
  constructor(
    private _batch: WriteBatch,
    private _getDocRef: <T>(
      endpoint: string,
      id: string
    ) => DocumentReference<T>
  ) {}

  set<T>({ endpoint, id, data }: BatchSet<T>): Batch {
    const docRef = this._getDocRef<T>(endpoint, id);
    this._batch.set(docRef, data);
    return this;
  }

  setMultiple<T>(sets: BatchSet<T>[]): Batch {
    sets.forEach((set) => this.set(set));
    return this;
  }

  update<T>({ endpoint, id, data }: BatchUpdate): Batch {
    const docRef = this._getDocRef<T>(endpoint, id);
    this._batch.update(docRef, data);
    return this;
  }

  updateMultiple<T>(updates: BatchUpdate[]): Batch {
    updates.forEach((update) => this.update<T>(update));
    return this;
  }

  delete<T>(endpoint: string, id: string): Batch {
    const docRef = this._getDocRef<T>(endpoint, id);
    this._batch.delete(docRef);
    return this;
  }

  commit(): Promise<void> {
    return this._batch.commit();
  }
}
