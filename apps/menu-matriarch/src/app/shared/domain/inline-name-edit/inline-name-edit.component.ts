import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inline-name-edit',
  templateUrl: './inline-name-edit.component.html',
  styleUrls: ['./inline-name-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNameEditComponent {
  @Input() name = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();

  public onCancel(): void {
    this.cancel.emit()
  }

  public onSave(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.save.emit(form.value.name);
  }
}
