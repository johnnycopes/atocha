import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay } from 'rxjs';
import { TodoDto } from './todo-dto.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly _countriesApiUrl =
    'https://jsonplaceholder.typicode.com/todos';

  constructor(private _http: HttpClient) {}

  fetchTodos(): Observable<TodoDto[]> {
    return this._http.get<TodoDto[]>(this._countriesApiUrl).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(() => {
        throw new Error('Network error');
      })
    );
  }
}
