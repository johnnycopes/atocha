import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';
import {
  LocalStorageKey,
  PlannerView,
  Route,
} from '@atocha/menu-matriarch/util';
import { LocalStateService } from './internal/local-state.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private _viewSubject = new BehaviorSubject<PlannerView>(
    (this._localStorageService.getItem(LocalStorageKey.plannerView) ??
      'dishes') as PlannerView
  );

  view$ = this._viewSubject.pipe(
    tap((view) =>
      this._localStorageService.setItem(LocalStorageKey.plannerView, view)
    ),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  route$ = this._menuService.activeMenuId$.pipe(
    map((menuId) => (menuId ? [Route.planner, menuId] : [Route.planner])),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private _localStateService: LocalStateService,
    private _localStorageService: LocalStorageService,
    private _menuService: MenuService
  ) {}

  updateView(view: PlannerView): void {
    this._viewSubject.next(view);
  }
}
