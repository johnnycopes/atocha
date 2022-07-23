import { Injectable } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterEvent,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, filter, distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _routeSubject = new BehaviorSubject<string>('');
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  route$ = this._routeSubject.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  loading$ = this._loadingSubject.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _router: Router) {
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
