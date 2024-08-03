import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { TodoService } from '@atocha/oxioracle/data-access';
import { groupBy, Todo } from '@atocha/oxioracle/util';

interface PieChart {
  data: ChartConfiguration<'pie'>['data'];
  options: ChartOptions<'pie'>;
}

interface BarChart {
  data: ChartConfiguration<'bar'>['data'];
  options: ChartOptions<'bar'>;
}

@Component({
  standalone: true,
  selector: 'app-charts',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  todos$ = this._todoService.sortedTodos$;

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
        options: { responsive: true },
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
        options: { responsive: true },
      };
    })
  );

  constructor(private _todoService: TodoService) {}
}
