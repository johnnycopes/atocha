import { Observable } from 'rxjs';

export interface IDtoService<TEntity, TDto, TData = Partial<TEntity>> {
  getOne(id: string): Observable<TDto | undefined>;
  getAll(): Observable<TDto[]>;
  create(data: TData): Promise<string>;
  update(item: TEntity, data: TData): Promise<void>;
  delete(item: TEntity): Promise<void>;
}
