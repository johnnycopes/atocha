import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from '@atocha/core/ui';
import { InlineNameEditComponent } from '@atocha/menu-matriarch/ui-domain';

@Component({
  standalone: true,
  selector: 'app-ingredients-board-form',
  imports: [
    ButtonComponent,
    CommonModule,
    FontAwesomeModule,
    InlineNameEditComponent,
  ],
  templateUrl: './ingredients-board-form.component.html',
  styleUrls: ['./ingredients-board-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardFormComponent {
  @Input() name = '';
  @Output() add = new EventEmitter<string>();

  readonly addNewIcon = faPlus;
  adding = false;
}
