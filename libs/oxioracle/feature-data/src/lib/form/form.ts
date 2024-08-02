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
  get userIdError(): string {
    return this.get('userId')?.errors?.[Validators.required.name]
      ? 'User ID is required'
      : '';
  }

  get titleError(): string {
    return this.get('title')?.errors?.[Validators.required.name]
      ? 'Title is required'
      : '';
  }

  constructor(
    readonly model: EditableTodo,
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
