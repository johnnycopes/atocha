import { Observable } from 'rxjs';

export interface DtoService<T> {
  getOne(id: string): Observable<T | undefined>;
  getMultiple(uid: string): Observable<T[]>;
  create(uid: string, data: Partial<T>): Promise<string>;
  update(item: T, data: Partial<T>): Promise<void>;
  delete(item: T): Promise<void>;
}
