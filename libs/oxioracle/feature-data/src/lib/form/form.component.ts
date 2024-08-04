import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { TodoForm } from './form';
import { wait } from '@atocha/core/util';
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
  feedback$ = new BehaviorSubject(false);

  constructor(private _todoService: TodoService) {}

  async onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this._todoService.addTodo(this.form.getRawValue());
    this.form.reset();
    this.feedback$.next(true);
    await wait(2000);
    this.feedback$.next(false);
  }
}
