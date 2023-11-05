import { Injectable } from '@angular/core';

import { View } from '@atocha/lorenzo/util';
import { CsvService } from './state/csv.service';
import { FilterService } from './state/filter.service';
import { PositionService } from './state/position.service';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  view$ = this._filterService.view$;
  text$ = this._filterService.text$;
  position$ = this._positionService.position$;

  constructor(
    private _csvService: CsvService,
    private _filterService: FilterService,
    private _positionService: PositionService
  ) {}

  updateView(view: View): void {
    this._filterService.updateView(view);
  }

  updateText(text: string): void {
    this._filterService.updateText(text);
  }

  updatePosition(position: number, view: View): void {
    this._positionService.updatePosition(position, view);
  }

  exportCsv(): void {
    this._csvService.exportDevelopments();
    this._csvService.exportLeaders();
    this._csvService.exportFamilies();
  }
}
