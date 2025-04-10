import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, of, switchMap } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import { PlannerService } from '@atocha/menu-matriarch/planner/data-access';
import { MenuService } from '@atocha/menu-matriarch/menus/data-access';
import { EmptyViewPlaceholderComponent } from '@atocha/menu-matriarch/shared/ui';
import { PlannerView } from '@atocha/menu-matriarch/shared/util';
import { PlannerDishesComponent } from './planner-dishes/planner-dishes.component';
import { PlannerMealsComponent } from './planner-meals/planner-meals.component';
import { PlannerMenuComponent } from './planner-menu/planner-menu.component';

@Component({
    selector: 'app-planner',
    imports: [
        ButtonComponent,
        CommonModule,
        EmptyViewPlaceholderComponent,
        PlannerDishesComponent,
        PlannerMealsComponent,
        PlannerMenuComponent,
        RouterModule,
    ],
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerComponent {
  view$ = this._plannerService.view$;
  menu$ = this._route.paramMap.pipe(
    map((paramMap) => paramMap.get('menuId')),
    switchMap((menuId) => {
      if (!menuId) {
        return of<'INVALID'>('INVALID');
      }
      return this._menuService.getOne(menuId);
    }),
    map((menu) => (menu ? menu : 'INVALID'))
  );

  constructor(
    private _route: ActivatedRoute,
    private _menuService: MenuService,
    private _plannerService: PlannerService
  ) {}

  updateView(view: PlannerView): void {
    this._plannerService.updateView(view);
  }
}
