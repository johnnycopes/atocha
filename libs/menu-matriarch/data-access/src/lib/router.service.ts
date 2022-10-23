import { Injectable } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterEvent,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  map,
  filter,
  tap,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs/operators';

import { PlannerView, Route } from '@atocha/menu-matriarch/util';
import { LocalStateService } from './internal/local-state.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _activeDishId$ = new BehaviorSubject<string>('');
  private _activeMealId$ = new BehaviorSubject<string>('');
  private _routerEvents$ = this._router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd)
  );

  loading$ = this._loading$.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // DishDataService
  activeDishId$ = this._activeDishId$.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // MealDataService
  activeMealId$ = this._activeMealId$.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // PlannerService
  activePlannerView$ = this._localStateService.plannerView$;

  plannerRoute$ = this._localStateService.menuId$.pipe(
    map((menuId) => (menuId ? [Route.planner, menuId] : [Route.planner])),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private _router: Router,
    private _localStateService: LocalStateService
  ) {
    this._routerEvents$
      .pipe(
        map((routerEvent: RouterEvent) => {
          if (
            routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError
          ) {
            return false;
          }
          return true;
        }),
        tap((loading) => this._loading$.next(loading))
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.planner)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const menuId = divviedUrl[divviedUrl.length - 1];
          if (menuId !== Route.planner) {
            this._localStateService.updateMenuId(menuId);
          }
        })
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.meals)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const mealId = divviedUrl[2];
          this._activeMealId$.next(mealId ?? '');
        })
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.dishes)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const dishId = divviedUrl[2];
          this._activeDishId$.next(dishId ?? '');
        })
      )
      .subscribe();
  }

  updatePlannerView(view: PlannerView): void {
    this._localStateService.updatePlannerView(view);
  }
}
