import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  template: `
    <button
      core-button="secondary"
      *ngIf="!adding; else addFormTemplate"
      class="new-button"
      (click)="adding = true"
    >
      New Ingredient
    </button>

    <ng-template #addFormTemplate>
      <ui-inline-name-edit
        class="form"
        (cancel)="adding = false"
        (save)="this.add.emit($event); adding = false"
      ></ui-inline-name-edit>
    </ng-template>
  `,
  styles: [
    `
      @import 'main';

      .new-button {
        width: 100%;
      }

      ui-input {
        margin-bottom: spacing(8);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardFormComponent {
  @Output() add = new EventEmitter<string>();
  adding = false;
}
