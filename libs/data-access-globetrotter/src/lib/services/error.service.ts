import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private readonly _errors = new BehaviorSubject<ErrorState>({
    global: '',
    login: '',
    register: '',
  });
  get errors(): BehaviorSubject<ErrorState> {
    return this._errors;
  }

  setGlobalError(error: string): void {
    this._errors
      .pipe(
        first(),
        map((errors) => ({ ...errors, global: error }))
      )
      .subscribe();
  }

  setLoginError(error: string): void {
    this._errors
      .pipe(
        first(),
        map((errors) => ({ ...errors, login: error }))
      )
      .subscribe();
  }

  setRegisterError(error: string): void {
    this._errors
      .pipe(
        first(),
        map((errors) => ({ ...errors, register: error }))
      )
      .subscribe();
  }
}
