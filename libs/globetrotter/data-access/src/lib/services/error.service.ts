import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly _globalSubject = new BehaviorSubject<boolean>(false);
  global$ = this._globalSubject.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  setGlobalError(error: boolean): void {
    this._globalSubject.next(error);
  }
}
