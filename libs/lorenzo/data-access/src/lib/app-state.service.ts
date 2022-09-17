import { Injectable } from '@angular/core';

import { View } from '@atocha/lorenzo/util';
import { FilterService } from './_state/filter.service';
import { PositionService } from './_state/position.service';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  view$ = this._filterService.view$;
  text$ = this._filterService.text$;
  position$ = this._positionService.position$;

  constructor(
    private _filterService: FilterService,
    private _positionService: PositionService,
  ) {}

  updateView(view: View): void {
    this._filterService.updateView(view);
  }

  updateText(text: string): void {
    this._filterService.updateText(text);
  }
}
