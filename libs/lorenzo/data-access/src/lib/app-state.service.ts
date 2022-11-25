import { Injectable } from '@angular/core';

import { View } from '@atocha/lorenzo/util';
import { CsvService } from './_state/csv.service';
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

  exportFamilies() {
    this._csvService.exportFamilies();
  }

  exportLeaders() {
    this._csvService.exportLeaders();
  }

  exportDevelopments() {
    this._csvService.exportDevelopments();
  }
}
