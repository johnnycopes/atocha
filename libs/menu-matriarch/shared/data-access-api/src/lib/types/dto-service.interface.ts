import { Observable } from 'rxjs';

export interface IDtoService<TEntity, TDto, TData = Partial<TEntity>> {
  getOne(id: string): Observable<TDto | undefined>;
  getMany(ids: string[]): Observable<TDto[]>;
  getAll(uid: string): Observable<TDto[]>;
  create(uid: string, data: TData): Promise<string>;
  update(item: TEntity, data: TData): Promise<void>;
  delete(item: TEntity): Promise<void>;
}
