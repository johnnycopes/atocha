import { Injectable } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';
import { Sort } from '@angular/material/sort';

import { State } from '@atocha/core/data-access';
import { EditableTodo, memo, Todo } from '@atocha/oxioracle/util';
import { ApiService } from './api.service';
import { mapTodoDtoToTodo } from './map-todo-dto-to-todo';
import { sortTodos } from './sort-todos';

type SortState = Sort | null;

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todosLoaded = false;
  private _todos = new State<{ todos: Todo[]; sort: SortState }>({
    todos: [],
    sort: null,
  });
  private _generateUUID = memo(this._apiService.startingTodoId);

  todos$ = this._todos.getProp('todos');
  sort$ = this._todos.getProp('sort');
  sortedTodos$ = this._todos
    .get()
    .pipe(
      map(({ todos, sort }) => (sort === null ? todos : sortTodos(todos, sort)))
    );

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

  addTodo(todo: EditableTodo) {
    const newTodo = {
      ...todo,
      id: this._generateUUID(),
    };
    this._todos.transformProp('todos', (todos) => [newTodo, ...todos]);
  }

  updateSort(sort: Sort) {
    this._todos.updateProp('sort', sort.direction === '' ? null : sort);
  }
}
