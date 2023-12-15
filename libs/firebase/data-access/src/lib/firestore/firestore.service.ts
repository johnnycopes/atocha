import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  DocumentReference,
  UpdateData,
  WriteBatch,
  deleteDoc,
  doc,
  docData,
  setDoc,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore) {}

  createBatch(): WriteBatch {
    return writeBatch(this._firestore.firestore);
  }

  createTransaction<T>(
    updateFn: (transaction: firebase.firestore.Transaction) => Promise<T>
  ): Promise<T> {
    return this._firestore.firestore.runTransaction(updateFn);
  }

  getDocRef<T>(endpoint: string, id: string): DocumentReference<T> {
    return this._getDocNew<T>(endpoint, id);
  }

  getOne<T>(endpoint: string, id: string): Observable<T | undefined> {
    return docData(this._getDocNew<T>(endpoint, id)).pipe(
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
    const doc = this._getDocNew<T>(endpoint, id);
    return await setDoc(doc, data);
  }

  async update<T>(
    endpoint: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    const doc = this._getDocNew<T>(endpoint, id);
    return await updateDoc<T>(doc, data as UpdateData<T>);
  }

  async delete<T>(endpoint: string, id: string): Promise<void> {
    const doc = this._getDocNew<T>(endpoint, id);
    return await deleteDoc(doc);
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

  private _getDocNew<T>(endpoint: string, id: string): DocumentReference<T> {
    return doc(this._firestore.firestore, endpoint, id) as DocumentReference<T>;
  }
}
