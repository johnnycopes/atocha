import { DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

export interface BatchUpdate {
  endpoint: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}

export class Batch {

  constructor(
    private _batch: firebase.firestore.WriteBatch,
    private _getDocRef: <T>(endpoint: string, id: string) => DocumentReference<T>,
  ) { }

  public set<T>({ endpoint, id, data }: {
    endpoint: string,
    id: string,
    data: T,
  }): Batch {
    const docRef = this._getDocRef<T>(endpoint, id);
    this._batch.set<T>(docRef, data);
    return this;
  }

  public update({ endpoint, id, data }: BatchUpdate): Batch {
    const docRef = this._getDocRef(endpoint, id);
    this._batch.update(docRef, data);
    return this;
  }

  public updateMultiple(updates: BatchUpdate[]): Batch {
    updates.forEach(({ endpoint, id, data }) => this.update({ endpoint, id, data }));
    return this;
  }

  public delete(endpoint: string, id: string): Batch {
    const docRef = this._getDocRef(endpoint, id);
    this._batch.delete(docRef);
    return this;
  }

  public commit(): Promise<void> {
    return this._batch.commit();
  }
}
