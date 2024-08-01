import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoService } from '@atocha/oxioracle/data-access';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  todos$ = this._todoService.todos$;

  constructor(private _todoService: TodoService) {}
}
