import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  Transaction,
  WriteBatch,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  increment,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable, catchError, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: Firestore) {}

  createBatch(): WriteBatch {
    return writeBatch(this._firestore);
  }

  createTransaction<T>(
    updateFn: (transaction: Transaction) => Promise<T>
  ): Promise<T> {
    return runTransaction(this._firestore, updateFn);
  }

  getDocRef<T>(endpoint: string, id: string): DocumentReference<T> {
    return this._getDocRef<T>(endpoint, id);
  }

  getOne<T>(endpoint: string, id: string): Observable<T | undefined> {
    const doc = this._getDocRef<T>(endpoint, id);
    return docData(doc).pipe(
      catchError(() => of(undefined)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getAll<T>(endpoint: string, uid: string): Observable<T[]> {
    const q = query(
      collection(this._firestore, endpoint) as CollectionReference<T>,
      where('uid', '==', uid),
      orderBy('name')
    );

    return collectionData(q).pipe(
      catchError(() => of([])),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  async create<T>(endpoint: string, id: string, data: T): Promise<void> {
    const doc = this._getDocRef<T>(endpoint, id);
    return await setDoc(doc, data);
  }

  async update<T>(
    endpoint: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    const doc = this._getDocRef<T>(endpoint, id);
    return await updateDoc(doc, data);
  }

  async delete<T>(endpoint: string, id: string): Promise<void> {
    const doc = this._getDocRef<T>(endpoint, id);
    return await deleteDoc(doc);
  }

  createId(): string {
    return doc(collection(this._firestore, '_')).id;
  }

  addToArray(...ids: string[]): string[] {
    return arrayUnion(...ids) as unknown as string[];
  }

  removeFromArray(...ids: string[]): string[] {
    return arrayRemove(...ids) as unknown as string[];
  }

  changeCounter(value: number): number {
    return increment(value) as unknown as number;
  }

  private _getDocRef<T>(endpoint: string, id: string): DocumentReference<T> {
    return doc(this._firestore, endpoint, id) as DocumentReference<T>;
  }
}
