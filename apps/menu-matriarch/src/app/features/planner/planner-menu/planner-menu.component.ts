import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Menu } from '@models/menu.interface';
import { MenuEntry } from '@models/menu-entry.interface';
import { MenuService } from '@services/menu.service';
import { PrintService } from '@services/print.service';
import { trackByDay } from '@utility/domain/track-by-functions';

@Component({
  selector: 'app-planner-menu',
  templateUrl: './planner-menu.component.html',
  styleUrls: ['./planner-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMenuComponent {
  @Input() menu: Menu | undefined;
  public readonly trackByFn = trackByDay;

  constructor(
    private _menuService: MenuService,
    private _printService: PrintService,
  ) { }

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
