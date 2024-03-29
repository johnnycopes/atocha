import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-kanban-board-form',
  imports: [CommonModule, FaIconComponent, FormsModule],
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
