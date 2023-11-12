import { Observable } from 'rxjs';

export interface DtoService<TEntity, TDto, TData = Partial<TEntity>> {
  getOne(id: string): Observable<TDto | undefined>;
  getMany(uid: string): Observable<TDto[]>;
  create(uid: string, data: TData): Promise<string>;
  update(item: TEntity, data: TData): Promise<void>;
  delete(item: TEntity): Promise<void>;
}
