import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Menu, MenuEntry } from '@atocha/menu-matriarch/types';
import { menuEntryTrackByFn } from '@atocha/menu-matriarch/ui';
import { MenuService, PrintService } from '@atocha/menu-matriarch/data-access';

@Component({
  selector: 'app-planner-menu',
  templateUrl: './planner-menu.component.html',
  styleUrls: ['./planner-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMenuComponent {
  @Input() menu: Menu | undefined;
  public readonly trackByFn = menuEntryTrackByFn;

  constructor(
    private _menuService: MenuService,
    private _printService: PrintService
  ) {}

  public onPrint(): void {
    if (!this.menu) {
      return;
    }
    const { name, entries, fallbackText, orientation } = this.menu;
    this._printService.printMenu({
      name,
      entries,
      fallbackText,
      orientation,
    });
  }

  public async onClearDay({ day }: MenuEntry): Promise<void> {
    if (!this.menu) {
      return;
    }
    return this._menuService.deleteMenuContents(this.menu, day);
  }

  public async onClearAll(): Promise<void> {
    if (!this.menu) {
      return;
    }
    return this._menuService.deleteMenuContents(this.menu);
  }
}
