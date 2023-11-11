import { Observable } from 'rxjs';

export interface DtoService<TEntity, TData = Partial<TEntity>> {
  getOne(id: string): Observable<TEntity | undefined>;
  getMultiple(uid: string): Observable<TEntity[]>;
  create(uid: string, data: TData): Promise<string>;
  update(item: TEntity, data: TData): Promise<void>;
  delete(item: TEntity): Promise<void>;
}
