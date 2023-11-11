import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from './firestore/firestore.service';

interface IDataService<T> {
  createId(): string;
  getOne(endpoint: string, id: string): Observable<T | undefined>;
  getMany(endpoint: string, uid: string): Observable<T[]>;
  create(endpoint: string, id: string, details: T): Promise<void>;
  update(endpoint: string, id: string, data: Partial<T>): Promise<void>;
  delete(endpoint: string, id: string): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class DataService<T> implements IDataService<T> {
  constructor(private _firestoreService: FirestoreService) {}

  createId() {
    return this._firestoreService.createId();
  }

  getOne(endpoint: string, id: string) {
    return this._firestoreService.getOne<T>(endpoint, id);
  }

  getMany(endpoint: string, uid: string) {
    return this._firestoreService.getMany<T>(endpoint, uid);
  }

  async create(endpoint: string, id: string, details: T) {
    return this._firestoreService.create<T>(endpoint, id, details);
  }

  async update(endpoint: string, id: string, data: Partial<T>) {
    return await this._firestoreService.update<T>(endpoint, id, data);
  }

  async delete(endpoint: string, id: string) {
    return await this._firestoreService.delete<T>(endpoint, id);
  }
}
