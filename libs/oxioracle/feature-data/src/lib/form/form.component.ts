import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoForm } from './form';
import { TodoService } from '@atocha/oxioracle/data-access';
import { Todo } from '@atocha/oxioracle/util';

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
    const todo: Todo = {
      ...this.form.getRawValue(),
      id: '181818',
    };
    this._todoService.addTodo(todo);
    this.form.reset();
  }
}
