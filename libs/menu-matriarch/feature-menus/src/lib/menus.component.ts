import { ChangeDetectionStrategy, Component } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { mapTo, shareReplay } from 'rxjs/operators';

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
  menus$ = this._menuService.getMenus();
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

  async onRename(id: string, name: string): Promise<void> {
    await this._menuService.updateMenuName(id, name);
  }

  async onStartDayChange(id: string, startDay: Day): Promise<void> {
    await this._menuService.updateMenuStartDay(id, startDay);
  }
}
