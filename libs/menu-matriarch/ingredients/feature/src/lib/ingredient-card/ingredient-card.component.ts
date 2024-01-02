import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CardComponent,
  CountComponent,
  InlineNameEditComponent,
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
} from '@atocha/menu-matriarch/shared/ui';

type State = 'default' | 'renaming';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-ingredient-card]',
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    CountComponent,
    FaIconComponent,
    InlineNameEditComponent,
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
  @Input() dishIds: string[] = [];
  @Output() rename = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();

  private _stateSubject = new BehaviorSubject<State>('default');
  state$ = this._stateSubject.asObservable();

  readonly menuToggleIcon = faEllipsisV;

  onRename(): void {
    this._stateSubject.next('renaming');
  }

  onRenameSave(name: string): void {
    if (name !== this.name) {
      this.rename.emit(name);
    }
    this._stateSubject.next('default');
  }

  onCancel(): void {
    this._stateSubject.next('default');
  }
}
