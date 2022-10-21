import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { MenuService, RouterService } from '@atocha/menu-matriarch/data-access';
import { PlannerView } from '@atocha/menu-matriarch/util';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerComponent {
  view$ = this._routerService.activePlannerView$.pipe(tap(console.log));
  menu$ = this._route.paramMap.pipe(
    map((paramMap) => paramMap.get('menuId')),
    switchMap((menuId) => {
      if (!menuId) {
        return of<'INVALID'>('INVALID');
      }
      return this._menuService.getMenu(menuId);
    }),
    map((menu) => (menu ? menu : 'INVALID'))
  );

  constructor(
    private _route: ActivatedRoute,
    private _menuService: MenuService,
    private _routerService: RouterService
  ) {}

  updatePlannerView(view: PlannerView): void {
    this._routerService.updatePlannerView(view);
  }
}
