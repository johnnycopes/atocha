import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Region, mapRegionsToPlacesModel } from '@atocha/globetrotter/util';
import {
  createPlaceTree,
  getId,
  getChildren,
  getNumberOfCountries,
  PlaceTree,
} from './create-places-tree';

@Component({
  selector: 'app-select-places',
  templateUrl: './select-places.component.html',
  styleUrls: ['./select-places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlacesComponent {
  @Input()
  set regions(regions: Region[]) {
    this._allPlaces = mapRegionsToPlacesModel(regions);
    this.tree = createPlaceTree('Places', regions);
  }
  @Input() places: string[] = [];
  @Output() placesChange = new EventEmitter<string[]>();

  tree: PlaceTree | undefined;
  getId = getId;
  getChildren = getChildren;
  getNumberOfCountries = getNumberOfCountries;
  private _allPlaces: string[] = [];

  onPlacesChange(places: string[]): void {
    this.placesChange.emit(places);
  }

  onSelectAll(): void {
    this.placesChange.emit(this._allPlaces);
  }

  onClearAll(): void {
    this.placesChange.emit([]);
  }
}
