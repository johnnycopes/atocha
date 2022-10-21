import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';
import { PlannerView } from '@atocha/menu-matriarch/util';

@Injectable({
  providedIn: 'root',
})
export class LocalStateService {
  private _menuId$ = new BehaviorSubject<string | null>(null);
  private _plannerView$ = new BehaviorSubject<PlannerView>('dishes');

  constructor(private _localStorageService: LocalStorageService) {}

  getPlannerView(): PlannerView {
    const view = (this._localStorageService.getItem('PLANNER_VIEW') ??
      'dishes') as PlannerView;
    this._plannerView$.next(view);
    return view;
  }

  watchPlannerView(): Observable<PlannerView> {
    this.getPlannerView();
    return this._plannerView$.pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      distinctUntilChanged()
    );
  }

  setPlannerView(view: PlannerView): void {
    this._plannerView$.next(view);
    this._localStorageService.setItem('PLANNER_VIEW', view);
  }

  getMenuId(): string | null {
    const id = this._localStorageService.getItem('MENU_ID');
    this._menuId$.next(id);
    return id;
  }

  watchMenuId(): Observable<string | null> {
    this.getMenuId();
    return this._menuId$.pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      distinctUntilChanged()
    );
  }

  setMenuId(id: string): void {
    this._menuId$.next(id);
    this._localStorageService.setItem('MENU_ID', id);
  }

  deleteMenuId(): void {
    this._menuId$.next(null);
    this._localStorageService.removeItem('MENU_ID');
  }
}
