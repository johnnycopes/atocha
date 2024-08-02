import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Todo } from '@atocha/oxioracle/util';

export type EditableTodo = Omit<Todo, 'id'>;

export class TodoForm extends FormGroup<Form<EditableTodo>> {
  readonly userId = this.controls.userId;
  readonly title = this.controls.title;
  readonly completed = this.controls.completed;

  get userIdError(): string {
    return this.userId.touched && this.userId.errors?.[Validators.required.name]
      ? 'User ID is required'
      : '';
  }

  get titleError(): string {
    return this.title.touched && this.title?.errors?.[Validators.required.name]
      ? 'Title is required'
      : '';
  }

  constructor(
    readonly model: EditableTodo = { userId: '', title: '', completed: false },
    readonly fb: NonNullableFormBuilder = new FormBuilder().nonNullable
  ) {
    super(
      fb.group({
        userId: fb.control(model.userId, Validators.required),
        title: fb.control(model.title, Validators.required),
        completed: fb.control(model.completed, Validators.required),
      }).controls
    );
  }
}
