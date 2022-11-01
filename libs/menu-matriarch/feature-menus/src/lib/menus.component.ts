import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { trackByFactory } from '@atocha/core/ui';
import { MenuService, PrintService } from '@atocha/menu-matriarch/data-access';
import { Day, Menu } from '@atocha/menu-matriarch/util';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenusComponent {
  addingSubject = new BehaviorSubject<boolean>(false);

  vm$ = combineLatest([
    this._menuService.getMenus(),
    this._menuService.activeMenuId$,
    this.addingSubject.asObservable(),
  ]).pipe(
    map(([menus, activeMenuId, adding]) => ({ menus, activeMenuId, adding }))
  );

  readonly trackByFn = trackByFactory<Menu>(({ id }) => id);

  constructor(
    private _menuService: MenuService,
    private _printService: PrintService
  ) {}

  onSave(name: string): void {
    this._menuService.createMenu({ name }).subscribe();
    this.addingSubject.next(false);
  }

  onPrint({ name, entries, orientation, fallbackText }: Menu): void {
    this._printService.printMenu({
      name,
      orientation,
      entries,
      fallbackText,
    });
  }

  onRename(id: string, name: string): void {
    this._menuService.updateMenuName(id, name);
  }

  onStartDayChange(id: string, startDay: Day): void {
    this._menuService.updateMenuStartDay(id, startDay);
  }

  onDelete(id: string): void {
    this._menuService.deleteMenu(id);
  }
}
