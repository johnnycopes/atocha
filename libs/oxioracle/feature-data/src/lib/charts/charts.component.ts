import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoService } from '@atocha/oxioracle/data-access';

@Component({
  standalone: true,
  selector: 'app-charts',
  imports: [CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  todos$ = this._todoService.todos$;

  constructor(private _todoService: TodoService) {}
}
