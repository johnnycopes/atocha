import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { MenuService } from '@atocha/menu-matriarch/data-access';
import {
  MealDefDirective,
  MealsListComponent,
} from '@atocha/menu-matriarch/shared/feature';
import { Day, Menu } from '@atocha/menu-matriarch/shared/util';
import { PlannerMealComponent } from './planner-meal/planner-meal.component';

@Component({
  standalone: true,
  selector: 'app-planner-meals',
  imports: [MealDefDirective, MealsListComponent, PlannerMealComponent],
  templateUrl: './planner-meals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMealsComponent {
  @Input() menu: Menu | undefined;
  @Output() nameDblClick = new EventEmitter<void>();

  constructor(private _menuService: MenuService) {}

  async onDayChange(
    menu: Menu | undefined,
    {
      dishIds,
      day,
      selected,
    }: { dishIds: string[]; day: Day; selected: boolean }
  ): Promise<void> {
    if (!menu) {
      return;
    }
    return this._menuService.updateMenuContents({
      menu,
      dishIds,
      day,
      selected,
    });
  }
}
