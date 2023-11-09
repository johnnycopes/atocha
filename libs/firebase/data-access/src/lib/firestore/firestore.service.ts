import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore) {}

  createBatch(): firebase.firestore.WriteBatch {
    return this._firestore.firestore.batch();
  }

  createTransaction<T>(
    updateFn: (transaction: firebase.firestore.Transaction) => Promise<T>
  ): Promise<T> {
    return this._firestore.firestore.runTransaction(updateFn);
  }

  getDocRef<T>(endpoint: string, id: string): DocumentReference<T> {
    return this._getDoc<T>(endpoint, id).ref;
  }

  getOne<T>(endpoint: string, id: string): Observable<T | undefined> {
    return this._getDoc<T>(endpoint, id)
      .valueChanges()
      .pipe(
        catchError(() => of(undefined)),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  getMany<T>(endpoint: string, uid: string): Observable<T[]> {
    return this._firestore
      .collection<T>(endpoint, (ref) =>
        ref.where('uid', '==', uid).orderBy('name')
      )
      .valueChanges()
      .pipe(
        catchError(() => of([])),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  async create<T>(endpoint: string, id: string, data: T): Promise<void> {
    return await this._getDoc<T>(endpoint, id).set(data);
  }

  async update<T>(
    endpoint: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    return await this._getDoc<T>(endpoint, id).update(data);
  }

  async delete<T>(endpoint: string, id: string): Promise<void> {
    return await this._getDoc<T>(endpoint, id).delete();
  }

  createId(): string {
    return this._firestore.createId();
  }

  addToArray(...ids: string[]): string[] {
    return firebase.firestore.FieldValue.arrayUnion(
      ...ids
    ) as unknown as string[];
  }

  removeFromArray(...ids: string[]): string[] {
    return firebase.firestore.FieldValue.arrayRemove(
      ...ids
    ) as unknown as string[];
  }

  changeCounter(value: number): number {
    return firebase.firestore.FieldValue.increment(value) as unknown as number;
  }

  private _getDoc<T>(
    endpoint: string,
    id: string
  ): AngularFirestoreDocument<T> {
    return this._firestore.collection<T>(endpoint).doc(id);
  }
}
