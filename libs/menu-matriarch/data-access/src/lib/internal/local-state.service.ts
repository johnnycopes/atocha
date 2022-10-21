import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';
import { PlannerView } from '@atocha/menu-matriarch/util';

@Injectable({
  providedIn: 'root',
})
export class LocalStateService {
  private readonly _keys = {
    plannerView: 'PLANNER_VIEW',
    menuId: 'MENU_ID',
  };
  private _menuIdSubject = new BehaviorSubject<string | null>(null);
  private _plannerViewSubject = new BehaviorSubject<PlannerView>(
    (this._localStorageService.getItem(this._keys.plannerView) ??
      'dishes') as PlannerView
  );

  menuId$ = this._menuIdSubject.pipe(
    tap((id) => {
      if (id) {
        this._localStorageService.setItem(this._keys.menuId, id);
      } else {
        this._localStorageService.removeItem(this._keys.menuId);
      }
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  plannerView$ = this._plannerViewSubject.pipe(
    tap((view) =>
      this._localStorageService.setItem(this._keys.plannerView, view)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  setPlannerView(view: PlannerView): void {
    this._plannerViewSubject.next(view);
  }

  getMenuId(): string | null {
    const id = this._localStorageService.getItem(this._keys.menuId);
    this._menuIdSubject.next(id);
    return id;
  }

  setMenuId(id: string): void {
    this._menuIdSubject.next(id);
    this._localStorageService.setItem(this._keys.menuId, id);
  }

  deleteMenuId(): void {
    this._menuIdSubject.next(null);
    this._localStorageService.removeItem(this._keys.menuId);
  }
}
