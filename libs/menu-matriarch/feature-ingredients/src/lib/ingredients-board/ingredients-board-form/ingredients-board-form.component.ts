import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-ingredients-board-form',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './ingredients-board-form.component.html',
  styleUrls: ['./ingredients-board-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardFormComponent {
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
