import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type AppError = 'invalidMenuId';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _error$ = new BehaviorSubject<AppError | undefined>(undefined);

  get errors$(): Observable<AppError | undefined> {
    return this._error$.asObservable();
  }

  set(error: AppError): void {
    this._error$.next(error);
  }

  clear(): void {
    this._error$.next(undefined);
  }
}
