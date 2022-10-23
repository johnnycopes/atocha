import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

type AppError = 'invalidMenuId';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _error$ = new BehaviorSubject<AppError | undefined>(undefined);

  errors$ = this._error$.pipe(shareReplay({ bufferSize: 1, refCount: true }));

  set(error: AppError): void {
    this._error$.next(error);
  }

  clear(): void {
    this._error$.next(undefined);
  }
}
