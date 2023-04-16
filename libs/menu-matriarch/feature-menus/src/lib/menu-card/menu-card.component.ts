import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import { Day, MenuEntry, Orientation } from '@atocha/menu-matriarch/util';
import {
  InlineDaySelectComponent,
  InlineNameEditComponent,
  MealSummaryComponent,
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
  SmallCapsLabelComponent,
  menuEntryTrackByFn,
} from '@atocha/menu-matriarch/ui';
import { CardComponent } from '@atocha/menu-matriarch/ui-generic';

type State = 'default' | 'renaming' | 'changingStartDay';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-menu-card]',
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    FontAwesomeModule,
    InlineNameEditComponent,
    InlineDaySelectComponent,
    MealSummaryComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    RouterLink,
    SmallCapsLabelComponent,
  ],
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() startDay: Day = 'Monday';
  @Input() entries: MenuEntry[] = [];
  @Input() orientation: Orientation = 'horizontal';
  @Input() fallbackText = '';
  @Input() canDelete = true;
  @Input() active = false;
  @Output() print = new EventEmitter<void>();
  @Output() rename = new EventEmitter<string>();
  @Output() startDayChange = new EventEmitter<Day>();
  @Output() delete = new EventEmitter<void>();

  private _stateSubject = new BehaviorSubject<State>('default');
  state$ = this._stateSubject.asObservable();
  readonly menuToggleIcon = faEllipsisV;
  readonly trackByFn = menuEntryTrackByFn;

  onRename(): void {
    this._stateSubject.next('renaming');
  }

  onRenameSave(name: string): void {
    if (name !== this.name) {
      this.rename.emit(name);
    }
    this._stateSubject.next('default');
  }

  onChangeStartDay(): void {
    this._stateSubject.next('changingStartDay');
  }

  onChangeStartDaySave(day: Day): void {
    if (day !== this.startDay) {
      this.startDayChange.emit(day);
    }
    this._stateSubject.next('default');
  }

  onCancel(): void {
    this._stateSubject.next('default');
  }
}
