import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { LocalStorageService, State } from '@atocha/core/data-access';
import { MenuService } from '@atocha/menu-matriarch/menus/data-access';
import {
  LocalStorageKey,
  ROUTES,
} from '@atocha/menu-matriarch/shared/data-access-routing';
import { PlannerView } from '@atocha/menu-matriarch/shared/util';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private _state = new State<{ view: PlannerView }>({
    view: (this._localStorageService.getItem(LocalStorageKey.plannerView) ??
      'dishes') as PlannerView,
  });

  view$ = this._state
    .getProp('view')
    .pipe(
      tap((view) =>
        this._localStorageService.setItem(LocalStorageKey.plannerView, view)
      )
    );

  route$ = this._menuService.activeMenuId$.pipe(
    map((menuId) => (menuId ? [ROUTES.planner, menuId] : [ROUTES.planner]))
  );

  constructor(
    private _localStorageService: LocalStorageService,
    private _menuService: MenuService
  ) {}

  updateView(view: PlannerView): void {
    this._state.updateProp('view', view);
  }
}
