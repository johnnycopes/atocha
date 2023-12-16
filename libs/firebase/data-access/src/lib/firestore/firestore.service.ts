import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  DocumentReference,
  Transaction,
  UpdateData,
  WriteBatch,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  docData,
  increment,
  runTransaction,
  setDoc,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
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
    updateFn: (transaction: Transaction) => Promise<T>
  ): Promise<T> {
    return runTransaction(this._firestore.firestore, updateFn);
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
    const doc = this._getDocRef<T>(endpoint, id);
    return await setDoc(doc, data);
  }

  async update<T>(
    endpoint: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    const doc = this._getDocRef<T>(endpoint, id);
    return await updateDoc<T>(doc, data as UpdateData<T>);
  }

  async delete<T>(endpoint: string, id: string): Promise<void> {
    const doc = this._getDocRef<T>(endpoint, id);
    return await deleteDoc(doc);
  }

  createId(): string {
    return doc(collection(this._firestore.firestore, '_')).id;
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
    return doc(this._firestore.firestore, endpoint, id) as DocumentReference<T>;
  }
}
