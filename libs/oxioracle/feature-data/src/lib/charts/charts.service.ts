import { Injectable } from '@angular/core';
import { TodoService } from '@atocha/oxioracle/data-access';
import { map, Observable } from 'rxjs';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
  ChartTypeRegistry,
} from 'chart.js';

import { groupBy } from './group-by';

export interface Chart<T extends ChartType = keyof ChartTypeRegistry> {
  data: ChartConfiguration<T>['data'];
  options: ChartOptions<T>;
  type: T;
}

type BarChart = Chart<'bar'>;
type PieChart = Chart<'pie'>;

@Injectable()
export class ChartsService {
  private readonly _todoColor = '#094677';
  private readonly _completedTodoColor = '#48b586';
  private readonly _incompleteTodoColor = '#d7d58e';

  barChart$: Observable<BarChart> = this._todoService.todos$.pipe(
    map((todos) => {
      const todosByUser = groupBy(todos, 'userId');
      return {
        data: {
          datasets: [
            {
              data: Object.values(todosByUser).map((todos) => todos.length),
              label: 'All todos',
              backgroundColor: this._todoColor,
              borderColor: this._todoColor,
            },
            {
              data: Object.values(todosByUser).map(
                (todos) => todos.filter((todo) => todo.completed).length
              ),
              label: 'Completed todos',
              backgroundColor: this._completedTodoColor,
              borderColor: this._completedTodoColor,
            },
            {
              data: Object.values(todosByUser).map(
                (todos) => todos.filter((todo) => !todo.completed).length
              ),
              label: 'Incomplete todos',
              backgroundColor: this._incompleteTodoColor,
              borderColor: this._incompleteTodoColor,
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
              font: { size: 20, weight: 400, family: 'Raleway, sans-serif' },
            },
            legend: { labels: { font: { family: 'Raleway, sans-serif' } } },
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
          datasets: [
            {
              data,
              backgroundColor: [
                this._completedTodoColor,
                this._incompleteTodoColor,
              ],
            },
          ],
          labels: ['Completed', 'Not completed'],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `All todos (${todos.length} total)`,
              font: { size: 20, weight: 400, family: 'Raleway, sans-serif' },
            },
            legend: { labels: { font: { family: 'Raleway, sans-serif' } } },
          },
        },
        type: 'pie',
      };
    })
  );

  constructor(private _todoService: TodoService) {}
}
