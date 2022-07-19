import { Injectable } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterEvent,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _routeSubject = new BehaviorSubject<string>('');
  private _loadingSubject = new BehaviorSubject<boolean>(false);

  get route$(): Observable<string> {
    return this._routeSubject.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loadingSubject.asObservable();
  }

  constructor(private _router: Router) {
    this._intialize();
  }

  private _intialize(): void {
    this._router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((navigationEnd: NavigationEnd) => navigationEnd.urlAfterRedirects),
        distinctUntilChanged()
      )
      .subscribe((currentRoute) => this._routeSubject.next(currentRoute));

    this._router.events
      .pipe(
        filter((e): e is RouterEvent => e instanceof RouterEvent),
        map((routerEvent) => {
          if (
            routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError
          ) {
            return false;
          }
          return true;
        }),
        distinctUntilChanged()
      )
      .subscribe((loading) => this._loadingSubject.next(loading));
  }
}
