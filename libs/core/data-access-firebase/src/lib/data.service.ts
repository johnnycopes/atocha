import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from '@atocha/core/data-access-firebase';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _firestoreService: FirestoreService) {}

  createId(): string {
    return this._firestoreService.createId();
  }

  getOne<T>(endpoint: string, id: string): Observable<T | undefined> {
    return this._firestoreService.getOne(endpoint, id);
  }

  getMany<T>(endpoint: string, uid: string): Observable<T[]> {
    return this._firestoreService.getMany(endpoint, uid);
  }

  async create<T>(
    endpoint: string,
    id: string,
    details: T
  ): Promise<void> {
    return this._firestoreService.create(endpoint, id, details);
  }

  async update<T>(
    endpoint: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    return await this._firestoreService.update(endpoint, id, data);
  }

  async delete(endpoint: string, id: string): Promise<void> {
    return await this._firestoreService.delete(endpoint, id);
  }
}
