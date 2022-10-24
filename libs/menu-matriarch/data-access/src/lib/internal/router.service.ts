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
import { DishService } from '../dish.service';
import { MealDataService } from './meal-data.service';
import { MenuDataService } from './menu-data.service';

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
    private _dishService: DishService,
    private _mealDataService: MealDataService,
    private _menuDataService: MenuDataService
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
            this._menuDataService.updateActiveMenuId(menuId);
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
          this._dishService.updateActiveDishId(dishId ?? '');
        })
      )
      .subscribe();
  }
}
