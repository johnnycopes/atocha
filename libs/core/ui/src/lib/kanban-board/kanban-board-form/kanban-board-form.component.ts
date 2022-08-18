import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'core-kanban-board-form',
  templateUrl: './kanban-board-form.component.html',
  styleUrls: ['./kanban-board-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardFormComponent {
  @Input() name = '';
  @Output() add: EventEmitter<string> = new EventEmitter();
  readonly addNewIcon = faPlus;
  adding = false;
  model = '';

  submitForm(form: NgForm): void {
    this.add.emit(this.model);
    this.resetForm(form);
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.adding = false;
  }
}
