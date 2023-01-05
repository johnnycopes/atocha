import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import {
  Place,
  PlaceSelection,
  isSubregion,
  mapRegionsToPlaceSelection,
  Region,
  mapRegionsToPlaceModel,
} from '@atocha/globetrotter/util';
import {
  createPlaceTree,
  getId,
  getChildren,
  getNumberOfCountries,
  PlaceTree,
} from './create-places-tree';

interface RegionState {
  region: Place;
  model: string[];
  selected: number;
  total: number;
}

@Component({
  selector: 'app-select-places',
  templateUrl: './select-places.component.html',
  styleUrls: ['./select-places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlacesComponent {
  @Input()
  set regions(value: Region[]) {
    this._allSelectedState = mapRegionsToPlaceSelection(value);
    this._allSelectedModel = mapRegionsToPlaceModel(value);
    this.regionStates = value.map((region) => ({
      region,
      model: [],
      selected: 0,
      total: 0,
    }));

    this.tree = createPlaceTree({ root: 'Places', regions: value });
  }

  @Input()
  set model(value: string[]) {
    if (value) {
      console.log(value);
      this.placesModel = value;
    }
  }

  tree: PlaceTree | undefined;
  placesModel: string[] = [];

  @Output() placesChange = new EventEmitter<PlaceSelection>();
  @Output() modelChange = new EventEmitter<string[]>();

  regionStates: RegionState[] = [];
  overallSelected = 0;
  overallTotal = 0;
  readonly trackByFn = trackByFactory<RegionState>(({ region }) => region.name);
  private _allSelectedState: PlaceSelection = {};
  private _allSelectedModel: string[] = [];

  getId = getId;
  getChildren = getChildren;
  getNumberOfCountries = getNumberOfCountries;

  onModelChange(model: string[]): void {
    this.modelChange.emit(model);
  }

  onSelectedChange(regionState: RegionState, quantity: number): void {
    regionState.selected = quantity;
    this.overallSelected = this.regionStates.reduce(
      (accum, { selected }) => accum + selected,
      0
    );
  }

  onTotalChange(regionState: RegionState, quantity: number): void {
    regionState.total = quantity;
    this.overallTotal = this.regionStates.reduce(
      (accum, { total }) => accum + total,
      0
    );
  }

  onSelectAll(): void {
    this.modelChange.emit(this._allSelectedModel);
  }

  onClearAll(): void {
    this.modelChange.emit([]);
  }
}
