import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _globalSubject = new BehaviorSubject<boolean>(false);
  private readonly _shellSubject = new BehaviorSubject<boolean>(false);
  global$ = this._globalSubject.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  shell$ = this._shellSubject.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  setGlobalLoader(loading: boolean): void {
    this._globalSubject.next(loading);
  }

  setShellLoader(loading: boolean): void {
    this._shellSubject.next(loading);
  }
}
