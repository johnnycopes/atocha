import { Injectable } from '@angular/core';

import { State } from '@atocha/core/util';

interface Errors {
  global: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly _state = new State<Errors>({ global: false });
  global$ = this._state.getProp('global');

  setGlobalError(error: boolean): void {
    this._state.updateProp('global', error);
  }
}
