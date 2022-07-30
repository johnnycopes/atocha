
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

import { PlannerView } from '@models/planner-view.type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _prefix = 'MENU_MATRIARCH_';
  private _menuId$ = new BehaviorSubject<string | null>(null);
  private _plannerView$ = new BehaviorSubject<PlannerView>('dishes');

  public getPlannerView(): PlannerView {
    const view = (window.localStorage.getItem(this._prefix + 'PLANNER_VIEW') ?? 'dishes') as PlannerView;
    this._plannerView$.next(view);
    return view;
  }

  public watchPlannerView(): Observable<PlannerView> {
    this.getPlannerView();
    return this._plannerView$.pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      distinctUntilChanged(),
    );
  }

  public setPlannerView(view: PlannerView): void {
    this._plannerView$.next(view);
    window.localStorage.setItem(this._prefix + 'PLANNER_VIEW', view);
  }

  public getMenuId(): string | null {
    const id = window.localStorage.getItem(this._prefix + 'MENU_ID');
    this._menuId$.next(id);
    return id;
  }

  public watchMenuId(): Observable<string | null> {
    this.getMenuId();
    return this._menuId$.pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      distinctUntilChanged(),
    );
  }

  public setMenuId(id: string): void {
    this._menuId$.next(id);
    window.localStorage.setItem(this._prefix + 'MENU_ID', id);
  }

  public deleteMenuId(): void {
    this._menuId$.next(null);
    window.localStorage.removeItem(this._prefix + 'MENU_ID');
  }
}
