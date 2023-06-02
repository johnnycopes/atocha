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
import { BehaviorSubject } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CountComponent,
  InlineNameEditComponent,
} from '@atocha/menu-matriarch/ui-domain';
import {
  CardComponent,
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
} from '@atocha/menu-matriarch/ui-generic';
import { IngredientType } from '@atocha/menu-matriarch/util';
import { InlineTypeSelectComponent } from './inline-type-select/inline-type-select.component';

type State = 'default' | 'renaming' | 'changingType';

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
    InlineNameEditComponent,
    InlineTypeSelectComponent,
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
  @Output() rename = new EventEmitter<string>();
  @Output() typeChange = new EventEmitter<IngredientType>();
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

  onMove(): void {
    this._stateSubject.next('changingType');
  }

  onChangeTypeSave(type: IngredientType): void {
    if (type !== this.type) {
      this.typeChange.emit(type);
    }
    this._stateSubject.next('default');
  }

  onCancel(): void {
    this._stateSubject.next('default');
  }
}
