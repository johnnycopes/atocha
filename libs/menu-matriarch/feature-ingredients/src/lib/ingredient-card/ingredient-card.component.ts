import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CardComponent,
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
} from '@atocha/menu-matriarch/ui-generic';
import { CountComponent } from '@atocha/menu-matriarch/ui-domain';
import { IngredientType } from '@atocha/menu-matriarch/util';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-ingredient-card]',
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    CountComponent,
    FontAwesomeModule,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
  ],
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientCardComponent {
  @Input() name = '';
  @Input() type: IngredientType = 'misc';
  @Input() dishIds: string[] = [];
  @Output() delete = new EventEmitter<void>();
  readonly menuToggleIcon = faEllipsisV;

  rename(): void {
    // do something
  }
}
