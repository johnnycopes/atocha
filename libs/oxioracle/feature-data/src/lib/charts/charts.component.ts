import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

import { TodoService } from '@atocha/oxioracle/data-access';

interface PieChart {
  datasets: [{ data: number[] }];
  labels: string[];
  options: ChartOptions<'pie'>;
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
