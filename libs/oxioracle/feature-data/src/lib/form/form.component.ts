import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoForm } from './form';
import { TodoService } from '@atocha/oxioracle/data-access';

@Component({
  standalone: true,
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  readonly form = new TodoForm();

  constructor(private _todoService: TodoService) {}

  onSubmit() {
    this._todoService.addTodo(this.form.getRawValue());
    this.form.reset();
  }
}
