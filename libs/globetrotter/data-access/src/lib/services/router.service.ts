import { Injectable } from '@angular/core';
import {
  Event,
  Router,
  NavigationEnd,
  RouterEvent,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

import { State } from '@atocha/core/data-access';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private readonly _state = new State({ currentRoute: '' });
  route$ = this._state.getProp('currentRoute');

  constructor(private _router: Router, private _loaderService: LoaderService) {
    this._router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((navigationEnd: NavigationEnd) => navigationEnd.urlAfterRedirects),
        distinctUntilChanged()
      )
      .subscribe((currentRoute) =>
        this._state.updateProp('currentRoute', currentRoute)
      );

    this._router.events
      .pipe(
        filter((e): e is Event => e instanceof RouterEvent),
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
      .subscribe((loading) => {
        this._loaderService.setShellLoader(loading);
      });
  }
}
