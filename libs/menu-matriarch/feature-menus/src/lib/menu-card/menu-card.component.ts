import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

import { MenuService } from '@atocha/menu-matriarch/data-access';
import { Day, MenuEntry, Orientation } from '@atocha/menu-matriarch/util';
import { menuEntryTrackByFn } from '@atocha/menu-matriarch/ui';

type State = 'default' | 'renaming' | 'changingStartDay';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-menu-card]',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCardComponent implements OnChanges {
  @Input() id = '';
  @Input() name = '';
  @Input() startDay: Day = 'Monday';
  @Input() entries: MenuEntry[] = [];
  @Input() orientation: Orientation = 'horizontal';
  @Input() fallbackText = '';
  @Input() canDelete = true;
  @Output() print = new EventEmitter<void>();
  @Output() rename = new EventEmitter<string>();
  @Output() startDayChange = new EventEmitter<Day>();

  private _state$ = new BehaviorSubject<State>('default');
  state$ = this._state$.asObservable();
  readonly menuToggleIcon = faEllipsisV;
  readonly trackByFn = menuEntryTrackByFn;

  constructor(private _menuService: MenuService, private _router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    const name = changes['name'];
    if (name && !name.firstChange && name.currentValue !== name.previousValue) {
      this._state$.next('default');
    }

    const startDay = changes['startDay'];
    if (
      startDay &&
      !startDay.firstChange &&
      startDay.currentValue !== startDay.previousValue
    ) {
      this._state$.next('default');
    }
  }

  onRename(): void {
    this._state$.next('renaming');
  }

  onChangeStartDay(): void {
    this._state$.next('changingStartDay');
  }

  onCancel(): void {
    this._state$.next('default');
  }

  onDelete(): void {
    this._menuService.deleteMenu(this.id);
  }

  onDishClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }
}
