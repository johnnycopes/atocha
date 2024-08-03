import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { TodoService } from '@atocha/oxioracle/data-access';
import { groupBy, Todo } from '@atocha/oxioracle/util';

interface PieChart {
  datasets: [{ data: number[] }];
  labels: string[];
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

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  barChart$: Observable<BarChart> = this._todoService.todos$.pipe(
    map((todos) => {
      const todosByUser = groupBy<Todo>(todos, 'userId');
      return {
        data: {
          datasets: [
            {
              data: Object.values(todosByUser).map((todos) => todos.length),
              label: 'Todos',
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
        datasets: [{ data }],
        labels: ['Completed', 'Not completed'],
        options: { responsive: true },
      };
    })
  );

  constructor(private _todoService: TodoService) {}
}
