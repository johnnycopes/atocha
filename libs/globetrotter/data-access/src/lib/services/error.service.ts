import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

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
  get errors$(): Observable<ErrorState> {
    return this._errorsSubject;
  }

  setGlobalError(error: string): void {
    this._errorsSubject
      .pipe(
        first(),
        map((errors) => ({ ...errors, global: error }))
      )
      .subscribe();
  }

  setLoginError(error: string): void {
    this._errorsSubject
      .pipe(
        first(),
        map((errors) => ({ ...errors, login: error }))
      )
      .subscribe();
  }

  setRegisterError(error: string): void {
    this._errorsSubject
      .pipe(
        first(),
        map((errors) => ({ ...errors, register: error }))
      )
      .subscribe();
  }
}
