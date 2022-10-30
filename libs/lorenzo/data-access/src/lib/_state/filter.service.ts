import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LocalStorageService } from '@atocha/core/data-access';
import { State } from '@atocha/core/util';
import { View } from '@atocha/lorenzo/util';

interface Filters {
  view: View;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _key = 'VIEW';
  private _filters = new State<Filters>({
    view: this._getView(),
    text: '',
  });

  view$ = this._filters
    .getProp('view')
    .pipe(tap((view) => this._setView(view)));
  text$ = this._filters.getProp('text');

  constructor(private _localStorageService: LocalStorageService) {}

  updateView(view: View): void {
    this._filters.updateProp('view', view);
  }

  updateText(text: string): void {
    this._filters.updateProp('text', text);
  }

  private _getView(): View {
    return (this._localStorageService.getItem(this._key) ?? 'all') as View;
  }

  private _setView(view: View): void {
    this._localStorageService.setItem(this._key, view);
  }
}
