import { Observable } from 'rxjs';

export interface EntityService<TEntity, TData = Partial<TEntity>> {
  getOne(): Observable<TEntity | undefined>;
  getMany(): Observable<TEntity[]>;
  create(data: TData): Promise<string>;
  update(item: TEntity, data: TData): Promise<void>;
  delete(item: TEntity): Promise<void>;
}
