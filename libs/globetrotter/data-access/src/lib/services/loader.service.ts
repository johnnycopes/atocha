import { Injectable } from '@angular/core';

import { State } from '@atocha/core/util';

interface Loaders {
  global: boolean;
  shell: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _state = new State<Loaders>({
    global: false,
    shell: false,
  });
  global$ = this._state.getProp('global');
  shell$ = this._state.getProp('shell');

  setGlobalLoader(loading: boolean): void {
    this._state.updateProp('global', loading);
  }

  setShellLoader(loading: boolean): void {
    this._state.updateProp('shell', loading);
  }
}
