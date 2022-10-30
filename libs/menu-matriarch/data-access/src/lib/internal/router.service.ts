import { Injectable } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterEvent,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { map, filter, tap } from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';
import { State } from '@atocha/core/util';
import { LocalStorageKey, Route } from '@atocha/menu-matriarch/util';

interface RouterState {
  loading: boolean;
  activeMealId: string;
  activeMenuId: string | null;
  activeDishId: string;
}

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _routerEvents$ = this._router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd)
  );
  private _state = new State<RouterState>({
    loading: true,
    activeMealId: '',
    activeMenuId: this._localStorageService.getItem(LocalStorageKey.menuId),
    activeDishId: '',
  });

  loading$ = this._state.getProp('loading');
  activeMealId$ = this._state.getProp('activeMealId');
  activeMenuId$ = this._state.getProp('activeMenuId').pipe(
    tap((id) => {
      if (id) {
        this._localStorageService.setItem(LocalStorageKey.menuId, id);
      } else {
        this._localStorageService.removeItem(LocalStorageKey.menuId);
      }
    })
  );
  activeDishId$ = this._state.getProp('activeDishId');

  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService
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
        tap((loading) => this._state.updateProp('loading', loading))
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.planner)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const menuId = divviedUrl[divviedUrl.length - 1];
          if (menuId !== Route.planner) {
            this._state.updateProp('activeMenuId', menuId);
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
          this._state.updateProp('activeMealId', mealId ?? '');
        })
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.dishes)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const dishId = divviedUrl[2];
          this._state.updateProp('activeDishId', dishId ?? '');
        })
      )
      .subscribe();
  }
}
