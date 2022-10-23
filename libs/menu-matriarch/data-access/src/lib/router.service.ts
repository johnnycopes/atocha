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

import { Route } from '@atocha/menu-matriarch/util';
import { LocalStateService } from './internal/local-state.service';
import { MealDataService } from './internal/meal-data.service';
import { DishDataService } from './internal/dish-data.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _routerEvents$ = this._router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd)
  );

  loading$ = this._loading$.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private _router: Router,
    private _dishDataService: DishDataService,
    private _localStateService: LocalStateService,
    private _mealDataService: MealDataService
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
          this._mealDataService.updateActiveMealId(mealId ?? '');
        })
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.dishes)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const dishId = divviedUrl[2];
          this._dishDataService.updateActiveDishId(dishId ?? '');
        })
      )
      .subscribe();
  }
}
