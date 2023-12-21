import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from './firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class DtoService<T> {
  constructor(private _firestoreService: FirestoreService) {}

  createId(): string {
    return this._firestoreService.createId();
  }

  getOne(endpoint: string, id: string): Observable<T | undefined> {
    return this._firestoreService.getOne<T>(endpoint, id);
  }

  getAll(endpoint: string, uid: string): Observable<T[]> {
    return this._firestoreService.getAll<T>(endpoint, uid);
  }

  async create(endpoint: string, id: string, details: T): Promise<void> {
    return this._firestoreService.create<T>(endpoint, id, details);
  }

  async update(endpoint: string, id: string, data: Partial<T>): Promise<void> {
    return await this._firestoreService.update<T>(endpoint, id, data);
  }

  async delete(endpoint: string, id: string): Promise<void> {
    return await this._firestoreService.delete<T>(endpoint, id);
  }
}
