import { Injectable } from '@angular/core';
import { TodoService } from '@atocha/oxioracle/data-access';
import { map, Observable } from 'rxjs';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
  ChartTypeRegistry,
} from 'chart.js';

import { groupBy, Todo } from '@atocha/oxioracle/util';

export interface Chart<T extends ChartType = keyof ChartTypeRegistry> {
  data: ChartConfiguration<T>['data'];
  options: ChartOptions<T>;
  type: T;
}

type BarChart = Chart<'bar'>;
type PieChart = Chart<'pie'>;

@Injectable()
export class ChartsService {
  barChart$: Observable<BarChart> = this._todoService.todos$.pipe(
    map((todos) => {
      const todosByUser = groupBy<Todo>(todos, 'userId');
      return {
        data: {
          datasets: [
            {
              data: Object.values(todosByUser).map((todos) => todos.length),
              label: 'All todos',
            },
            {
              data: Object.values(todosByUser).map(
                (todos) => todos.filter((todo) => todo.completed).length
              ),
              label: 'Completed todos',
            },
            {
              data: Object.values(todosByUser).map(
                (todos) => todos.filter((todo) => !todo.completed).length
              ),
              label: 'Incomplete todos',
            },
          ],
          labels: Object.keys(todosByUser),
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Todos by User ID (${todos.length} total)`,
            },
          },
        },
        type: 'bar',
      };
    })
  );

  pieChart$: Observable<PieChart> = this._todoService.todos$.pipe(
    map((todos) => {
      const completed = todos.filter((todo) => todo.completed).length;
      const data = [completed, todos.length - completed];
      return {
        data: {
          datasets: [{ data }],
          labels: ['Completed', 'Not completed'],
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: `All todos (${todos.length} total)` },
          },
        },
        type: 'pie',
      };
    })
  );

  constructor(private _todoService: TodoService) {}
}
