import { DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

export interface BatchSet<T> {
  endpoint: string;
  id: string;
  data: T;
}

export interface BatchUpdate {
  endpoint: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}

export class Batch {
  constructor(
    private _batch: firebase.firestore.WriteBatch,
    private _getDocRef: <T>(
      endpoint: string,
      id: string
    ) => DocumentReference<T>
  ) {}

  set<T>({ endpoint, id, data }: BatchSet<T>): Batch {
    const docRef = this._getDocRef<T>(endpoint, id);
    this._batch.set<T>(docRef, data);
    return this;
  }

  setMultiple<T>(sets: BatchSet<T>[]): Batch {
    sets.forEach(({ endpoint, id, data }) => this.set({ endpoint, id, data }));
    return this;
  }

  update({ endpoint, id, data }: BatchUpdate): Batch {
    const docRef = this._getDocRef(endpoint, id);
    this._batch.update(docRef, data);
    return this;
  }

  updateMultiple(updates: BatchUpdate[]): Batch {
    updates.forEach(({ endpoint, id, data }) =>
      this.update({ endpoint, id, data })
    );
    return this;
  }

  delete(endpoint: string, id: string): Batch {
    const docRef = this._getDocRef(endpoint, id);
    this._batch.delete(docRef);
    return this;
  }

  commit(): Promise<void> {
    return this._batch.commit();
  }
}
