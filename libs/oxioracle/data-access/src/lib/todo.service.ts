import { Injectable } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';
import { Sort } from '@angular/material/sort';

import { State } from '@atocha/core/data-access';
import { Todo } from '@atocha/oxioracle/util';
import { ApiService } from './api.service';
import { mapTodoDtoToTodo } from './map-todo-dto-to-todo';

type SortState = Sort | null;

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todosLoaded = false;
  private _todos = new State<{ todos: Todo[]; sort: SortState }>({
    todos: [],
    sort: null,
  });
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

  updateSort(sort: Sort) {
    this._todos.updateProp('sort', sort.direction === '' ? null : sort);
  }
}
