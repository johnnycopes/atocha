import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Menu } from '@models/menu.interface';
import { Day } from '@models/day.type';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-planner-dishes',
  templateUrl: './planner-dishes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDishesComponent {
  @Input() menu: Menu | undefined;
  @Output() nameDblClick = new EventEmitter<void>();

  constructor(private _menuService: MenuService) { }

  public async onDayChange(
    menu: Menu | undefined,
    { id, day, selected }: { id: string, day: Day, selected: boolean }
  ): Promise<void> {
    if (!menu) {
      return;
    }
    return this._menuService.updateMenuContents({
      menu,
      dishIds: [id],
      day,
      selected
    });
  }
}
