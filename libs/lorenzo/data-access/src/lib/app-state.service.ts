import { Injectable } from '@angular/core';

import { View } from '@atocha/lorenzo/util';
import { FilterService } from './_state/filter.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  view$ = this._filterService.view$;
  text$ = this._filterService.text$;

  constructor(private _filterService: FilterService) {}

  updateView(view: View): void {
    this._filterService.updateView(view);
  }

  updateText(text: string): void {
    this._filterService.updateText(text);
  }
}
