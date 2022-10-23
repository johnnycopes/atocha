import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { PlannerView, Route } from '@atocha/menu-matriarch/util';
import { LocalStateService } from './internal/local-state.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  constructor(private _localStateService: LocalStateService) {}

  activePlannerView$ = this._localStateService.plannerView$;

  plannerRoute$ = this._localStateService.menuId$.pipe(
    map((menuId) => (menuId ? [Route.planner, menuId] : [Route.planner])),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  updatePlannerView(view: PlannerView): void {
    this._localStateService.updatePlannerView(view);
  }
}
