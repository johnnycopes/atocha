import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';

import { MenuService } from '@atocha/menu-matriarch/menus/data-access';
import {
  DishDefDirective,
  DishesListComponent,
} from '@atocha/menu-matriarch/shared/feature';
import { Day, Menu } from '@atocha/menu-matriarch/shared/util';
import { PlannerDishComponent } from './planner-dish/planner-dish.component';

@Component({
  selector: 'app-planner-dishes',
  imports: [DishDefDirective, DishesListComponent, PlannerDishComponent],
  templateUrl: './planner-dishes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDishesComponent {
  private _menuService = inject(MenuService);

  @Input() menu: Menu | undefined;
  @Output() nameDblClick = new EventEmitter<void>();

  async onDayChange(
    menu: Menu | undefined,
    { id, day, selected }: { id: string; day: Day; selected: boolean }
  ): Promise<void> {
    if (!menu) {
      return;
    }
    return this._menuService.updateMenuContents({
      menu,
      dishIds: [id],
      day,
      selected,
    });
  }
}
