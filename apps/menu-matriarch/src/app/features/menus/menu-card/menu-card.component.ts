import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

import { MenuService, PrintService } from '@atocha/menu-matriarch/data-access';
import { Day, MenuEntry, Orientation } from '@atocha/menu-matriarch/types';
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
  private _state$ = new BehaviorSubject<State>('default');
  public state$ = this._state$.asObservable();
  public readonly menuToggleIcon = faEllipsisV;
  public readonly trackByFn = menuEntryTrackByFn;

  constructor(
    private _menuService: MenuService,
    private _printService: PrintService
  ) {}

  public onPrint(): void {
    this._printService.printMenu({
      name: this.name,
      entries: this.entries,
      fallbackText: this.fallbackText,
      orientation: this.orientation,
    });
  }

  public onRename(): void {
    this._state$.next('renaming');
  }

  public async onRenameSave(name: string): Promise<void> {
    await this._menuService.updateMenuName(this.id, name);
    this._state$.next('default');
  }

  public onChangeStartDay(): void {
    this._state$.next('changingStartDay');
  }

  public async onChangeStartDaySave(startDay: Day): Promise<void> {
    await this._menuService.updateMenuStartDay(this.id, startDay);
    this._state$.next('default');
  }

  public onCancel(): void {
    this._state$.next('default');
  }

  public onDelete(): void {
    this._menuService.deleteMenu(this.id);
  }
}
