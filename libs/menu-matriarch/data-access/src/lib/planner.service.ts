import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { State } from '@atocha/core/util';
import { LocalStorageService } from '@atocha/core/data-access';
import {
  LocalStorageKey,
  PlannerView,
  Route,
} from '@atocha/menu-matriarch/util';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private _state = new State<{ view: PlannerView }>({
    view: (this._localStorageService.getItem(LocalStorageKey.plannerView) ??
      'dishes') as PlannerView,
  });

  view$ = this._state.getProp('view').pipe(
    tap((view) =>
      this._localStorageService.setItem(LocalStorageKey.plannerView, view)
    ),
    tap(console.log)
  );

  route$ = this._menuService.activeMenuId$.pipe(
    map((menuId) => (menuId ? [Route.planner, menuId] : [Route.planner]))
  );

  constructor(
    private _localStorageService: LocalStorageService,
    private _menuService: MenuService
  ) {}

  updateView(view: PlannerView): void {
    this._state.updateProp('view', view);
  }
}
