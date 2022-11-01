import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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
export class MenuCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() startDay: Day = 'Monday';
  @Input() entries: MenuEntry[] = [];
  @Input() orientation: Orientation = 'horizontal';
  @Input() fallbackText = '';
  @Input() canDelete = true;
  @Output() print = new EventEmitter<void>();
  private _state$ = new BehaviorSubject<State>('default');
  state$ = this._state$.asObservable();
  readonly menuToggleIcon = faEllipsisV;
  readonly trackByFn = menuEntryTrackByFn;

  constructor(private _menuService: MenuService, private _router: Router) {}

  onRename(): void {
    this._state$.next('renaming');
  }

  async onRenameSave(name: string): Promise<void> {
    await this._menuService.updateMenuName(this.id, name);
    this._state$.next('default');
  }

  onChangeStartDay(): void {
    this._state$.next('changingStartDay');
  }

  async onChangeStartDaySave(startDay: Day): Promise<void> {
    await this._menuService.updateMenuStartDay(this.id, startDay);
    this._state$.next('default');
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
