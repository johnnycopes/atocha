import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

interface ErrorState {
  global: string;
  login: string;
  register: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly _errorsSubject = new BehaviorSubject<ErrorState>({
    global: '',
    login: '',
    register: '',
  });
  errors$ = this._errorsSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  setGlobalError(error: string): void {
    this._errorsSubject
      .pipe(
        first(),
        map((errors) => ({ ...errors, global: error }))
      )
      .subscribe(this._errorsSubject);
  }

  setLoginError(error: string): void {
    this._errorsSubject
      .pipe(
        first(),
        map((errors) => ({ ...errors, login: error }))
      )
      .subscribe(this._errorsSubject);
  }

  setRegisterError(error: string): void {
    this._errorsSubject
      .pipe(
        first(),
        map((errors) => ({ ...errors, register: error }))
      )
      .subscribe(this._errorsSubject);
  }
}
