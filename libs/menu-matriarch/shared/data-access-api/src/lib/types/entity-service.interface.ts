import { Observable } from 'rxjs';

export interface IEntityService<TEntity, TData = Partial<TEntity>> {
  getOne(id: string): Observable<TEntity | undefined>;
  getMany(): Observable<TEntity[]>;
  create(data: TData): Observable<string | undefined>;
  update(item: TEntity, data: TData): Promise<void>;
  delete(item: TEntity): Promise<void>;
}
