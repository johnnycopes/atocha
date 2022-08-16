import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AutofocusDirective } from '@atocha/core/ui';
import { InlineFormComponent } from '../_generic/inline-form/inline-form.component';
import { InputComponent } from '../_generic/input/input.component';

@Component({
  standalone: true,
  selector: 'ui-inline-name-edit',
  imports: [
    AutofocusDirective,
    FormsModule,
    InlineFormComponent,
    InputComponent,
  ],
  templateUrl: './inline-name-edit.component.html',
  styleUrls: ['./inline-name-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNameEditComponent {
  @Input() name = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.save.emit(form.value.name);
  }
}
