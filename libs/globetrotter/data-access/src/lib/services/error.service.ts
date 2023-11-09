import { Injectable } from '@angular/core';

import { State } from '@atocha/core/data-access';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly _errors = new State({ global: false });
  global$ = this._errors.getProp('global');

  setGlobalError(error: boolean): void {
    this._errors.updateProp('global', error);
  }
}
