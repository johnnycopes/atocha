import { Injectable } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { Todo } from '@atocha/oxioracle/util';
import { ApiService } from './api.service';
import { mapTodoDtoToTodo } from './map-todo-dto-to-todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todosLoaded = false;
  private _todos = new State<{ todos: Todo[] }>({ todos: [] });
  todos$ = this._todos.getProp('todos');

  constructor(private _apiService: ApiService) {}

  getTodos(): Observable<Todo[]> {
    if (this._todosLoaded) {
      throw new Error(
        'Cannot call `getTodos` more than once: data has already been loaded'
      );
    }
    this._todosLoaded = true;
    return this._apiService.fetchTodos().pipe(
      first(),
      map((dtos) => dtos.map(mapTodoDtoToTodo)),
      tap((todos) => this._todos.updateProp('todos', todos))
    );
  }
}
