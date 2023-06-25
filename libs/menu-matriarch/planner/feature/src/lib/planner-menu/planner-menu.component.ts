import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ButtonComponent } from '@atocha/core/ui';
import {
  MenuService,
  PrintService,
} from '@atocha/menu-matriarch/menus/data-access';
import { Menu, MenuEntry } from '@atocha/menu-matriarch/shared/util';
import { menuEntryTrackByFn } from '@atocha/menu-matriarch/shared/ui-domain';
import { SectionComponent } from '@atocha/menu-matriarch/shared/ui-generic';
import { PlannerDayComponent } from './planner-day/planner-day.component';

@Component({
  standalone: true,
  selector: 'app-planner-menu',
  imports: [
    ButtonComponent,
    CommonModule,
    PlannerDayComponent,
    SectionComponent,
  ],
  templateUrl: './planner-menu.component.html',
  styleUrls: ['./planner-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMenuComponent {
  @Input() menu: Menu | undefined;
  readonly trackByFn = menuEntryTrackByFn;

  constructor(
    private _menuService: MenuService,
    private _printService: PrintService
  ) {}

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
