import { Injectable } from "@angular/core";
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map, filter, tap, distinctUntilChanged } from "rxjs/operators";

import { PlannerView } from "@models/planner-view.type";
import { Route } from "@models/route.enum";
import { LocalStorageService } from "./internal/local-storage.service";

// interface IRouterState {
//   currentRoute: string;
//   loading: boolean;
// }

@Injectable({
  providedIn: "root"
})
export class RouterService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _activeDishId$ = new BehaviorSubject<string>('');
  private _activeMealId$ = new BehaviorSubject<string>('');
  private _routerEvents$ = this._router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd)
  );

  public get loading$(): Observable<boolean> {
    return this._loading$;
  }

  public get activePlannerView$(): Observable<PlannerView> {
    return this._localStorageService.watchPlannerView();
  }

  public get activeMealId$(): Observable<string> {
    return this._activeMealId$.pipe(
      distinctUntilChanged()
    );
  }

  public get activeDishId$(): Observable<string> {
    return this._activeDishId$.pipe(
      distinctUntilChanged()
    );
  }

  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService,
  ) {
    this._routerEvents$.pipe(
      map((routerEvent: RouterEvent) => {
        if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
          return false;
        }
        return true;
      }),
      tap(loading => this._loading$.next(loading))
    ).subscribe();

    this._routerEvents$.pipe(
      filter(({ url }) => url.includes(Route.planner)),
      tap(event => {
        const divviedUrl = event.urlAfterRedirects.split('/');
        const menuId = divviedUrl[divviedUrl.length - 1];
        if (menuId !== Route.planner) {
          this._localStorageService.setMenuId(menuId);
        }
      })
    ).subscribe();

    this._routerEvents$.pipe(
      filter(({ url }) => url.includes(Route.meals)),
      tap(event => {
        const divviedUrl = event.urlAfterRedirects.split('/');
        const mealId = divviedUrl[2];
        this._activeMealId$.next(mealId ?? '');
      }),
    ).subscribe();

    this._routerEvents$.pipe(
      filter(({ url }) => url.includes(Route.dishes)),
      tap(event => {
        const divviedUrl = event.urlAfterRedirects.split('/');
        const dishId = divviedUrl[2];
        this._activeDishId$.next(dishId ?? '');
      }),
    ).subscribe();
  }

  public getPlannerRoute(): Observable<string[]> {
    return this._localStorageService.watchMenuId().pipe(
      map(menuId => {
        if (!menuId) {
          return [Route.planner];
        }
        return [Route.planner, menuId];
      })
    );
  }

  public updatePlannerView(view: PlannerView): void {
    this._localStorageService.setPlannerView(view);
  }
}
