import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { View } from '@atocha/lorenzo/util';
import { State } from '@atocha/core/util';

interface Filters {
  view: View;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _key = 'VIEW';
  private _state = new State<Filters>({
    view: this._getView(),
    text: '',
  });

  view$ = this._state.getProp('view').pipe(tap((view) => this._setView(view)));
  text$ = this._state.getProp('text');

  constructor(private _localStorageService: LocalStorageService) {}

  updateView(view: View): void {
    this._state.updateProp('view', view);
  }

  updateText(text: string): void {
    this._state.updateProp('text', text);
  }

  private _getView(): View {
    return (this._localStorageService.getItem(this._key) ?? 'all') as View;
  }

  private _setView(view: View): void {
    this._localStorageService.setItem(this._key, view);
  }
}
