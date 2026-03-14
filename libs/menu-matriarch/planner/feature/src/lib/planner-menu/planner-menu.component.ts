import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';

import { ButtonComponent } from '@atocha/core/ui';
import {
  MenuService,
  PrintService,
} from '@atocha/menu-matriarch/menus/data-access';
import { Menu, MenuEntry } from '@atocha/menu-matriarch/shared/util';
import {
  SectionComponent,
  menuEntryTrackByFn,
} from '@atocha/menu-matriarch/shared/ui';
import { PlannerDayComponent } from './planner-day/planner-day.component';

@Component({
  selector: 'app-planner-menu',
  imports: [ButtonComponent, PlannerDayComponent, SectionComponent],
  templateUrl: './planner-menu.component.html',
  styleUrls: ['./planner-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMenuComponent {
  private _menuService = inject(MenuService);
  private _printService = inject(PrintService);

  @Input() menu: Menu | undefined;
  readonly trackByFn = menuEntryTrackByFn;

  onPrint(): void {
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

  async onClearDay({ day }: MenuEntry): Promise<void> {
    if (!this.menu) {
      return;
    }
    return this._menuService.deleteMenuContents(this.menu, day);
  }

  async onClearAll(): Promise<void> {
    if (!this.menu) {
      return;
    }
    return this._menuService.deleteMenuContents(this.menu);
  }
}
