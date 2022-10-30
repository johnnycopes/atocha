import { Injectable } from '@angular/core';

import { State } from '@atocha/core/util';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _errors = new State<{
    invalidMenuId: boolean;
  }>({ invalidMenuId: false });

  errors$ = this._errors.get();

  setInvalidMenuError(error: boolean): void {
    this._errors.updateProp('invalidMenuId', error);
  }
}
