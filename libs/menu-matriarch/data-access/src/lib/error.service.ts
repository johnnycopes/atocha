import { Injectable } from '@angular/core';

import { State } from '@atocha/core/util';

interface Errors {
  invalidMenuId: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _errors = new State<Errors>({ invalidMenuId: false });

  errors$ = this._errors.get();

  set(type: keyof Errors, error: boolean): void {
    this._errors.updateProp(type, error);
  }
}
