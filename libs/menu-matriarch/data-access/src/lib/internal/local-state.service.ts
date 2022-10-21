import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';

import { LocalStorageService } from '@atocha/core/data-access';
import { PlannerView } from '@atocha/menu-matriarch/util';

@Injectable({
  providedIn: 'root',
})
export class LocalStateService {
  private _menuIdSubject = new BehaviorSubject<string | null>(null);
  private _plannerViewSubject = new BehaviorSubject<PlannerView>(
    (this._localStorageService.getItem('PLANNER_VIEW') ??
      'dishes') as PlannerView
  );

  plannerView$ = this._plannerViewSubject.pipe(
    tap((view) => this._localStorageService.setItem('PLANNER_VIEW', view)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _localStorageService: LocalStorageService) {}

  setPlannerView(view: PlannerView): void {
    this._plannerViewSubject.next(view);
  }

  getMenuId(): string | null {
    const id = this._localStorageService.getItem('MENU_ID');
    this._menuIdSubject.next(id);
    return id;
  }

  watchMenuId(): Observable<string | null> {
    this.getMenuId();
    return this._menuIdSubject.pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      distinctUntilChanged()
    );
  }

  setMenuId(id: string): void {
    this._menuIdSubject.next(id);
    this._localStorageService.setItem('MENU_ID', id);
  }

  deleteMenuId(): void {
    this._menuIdSubject.next(null);
    this._localStorageService.removeItem('MENU_ID');
  }
}
