import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, merge, Subject } from 'rxjs';
import { map, mapTo, shareReplay } from 'rxjs/operators';

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
  vm$ = combineLatest([
    this._menuService.getMenus(),
    this._menuService.activeMenuId$,
  ]).pipe(map(([menus, activeMenuId]) => ({ menus, activeMenuId })));
  startAdd$ = new Subject<void>();
  finishAdd$ = new Subject<void>();
  adding$ = merge(
    this.startAdd$.pipe(mapTo(true)),
    this.finishAdd$.pipe(mapTo(false))
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  readonly trackByFn = trackByFactory<Menu>(({ id }) => id);

  constructor(
    private _menuService: MenuService,
    private _printService: PrintService
  ) {}

  onSave(name: string): void {
    this._menuService.createMenu({ name }).subscribe();
    this.finishAdd$.next();
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
