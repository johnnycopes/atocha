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
  first,
} from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';
import { LocalStorageKey, Route } from '@atocha/menu-matriarch/util';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _routerEvents$ = this._router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd)
  );

  private _stateSubject = new BehaviorSubject({
    loading: true,
    activeMealId: '',
    activeMenuId: this._localStorageService.getItem(LocalStorageKey.menuId),
    activeDishId: '',
  });

  loading$ = this._stateSubject.pipe(
    map(({ loading }) => loading),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  activeMealId$ = this._stateSubject.pipe(
    map(({ activeMealId }) => activeMealId),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  activeMenuId$ = this._stateSubject.pipe(
    map(({ activeMenuId }) => activeMenuId),
    tap((id) => {
      if (id) {
        this._localStorageService.setItem(LocalStorageKey.menuId, id);
      } else {
        this._localStorageService.removeItem(LocalStorageKey.menuId);
      }
    }),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  activeDishId$ = this._stateSubject.pipe(
    map(({ activeDishId }) => activeDishId),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

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
        tap((loading) => {
          this._stateSubject
            .pipe(first())
            .subscribe((state) =>
              this._stateSubject.next({ ...state, loading })
            );
        })
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.planner)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const menuId = divviedUrl[divviedUrl.length - 1];
          if (menuId !== Route.planner) {
            this._stateSubject.pipe(first()).subscribe((state) =>
              this._stateSubject.next({
                ...state,
                activeMenuId: menuId,
              })
            );
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
          this._stateSubject.pipe(first()).subscribe((state) =>
            this._stateSubject.next({
              ...state,
              activeMealId: mealId ?? '',
            })
          );
        })
      )
      .subscribe();

    this._routerEvents$
      .pipe(
        filter(({ url }) => url.includes(Route.dishes)),
        tap((event) => {
          const divviedUrl = event.urlAfterRedirects.split('/');
          const dishId = divviedUrl[2];
          this._stateSubject.pipe(first()).subscribe((state) =>
            this._stateSubject.next({
              ...state,
              activeDishId: dishId ?? '',
            })
          );
        })
      )
      .subscribe();
  }
}
