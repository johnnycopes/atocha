import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { CheckboxStates } from '@atocha/core/ui';
import {
  Place,
  PlaceSelection,
  isSubregion,
  isRegion,
  mapRegionsToPlaceSelection,
  Region,
} from '@atocha/globetrotter/types';

interface RegionState {
  region: Place;
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
    this.regionStates = value.map((region) => ({
      region,
      selected: 0,
      total: 0,
    }));
  }

  @Input()
  set places(value: PlaceSelection) {
    if (value) {
      this.state = this._transformPlaceSelection(value);
    }
  }
  state: CheckboxStates = {};

  @Output() placesChange = new EventEmitter<PlaceSelection>();

  regionStates: RegionState[] = [];
  overallSelected = 0;
  overallTotal = 0;
  private _allSelectedState: PlaceSelection = {};

  getId = ({ name }: Place) => name;

  getChildren = (place: Place): Place[] =>
    isRegion(place) ? place.subregions : [];

  getNumberOfCountries = (place: Place) =>
    isSubregion(place) ? place.countries.length : 0;

  onStateChange(state: CheckboxStates): void {
    this.placesChange.emit(this._transformState(state));
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
    this.placesChange.emit(this._allSelectedState);
  }

  onClearAll(): void {
    this.placesChange.emit({});
  }

  private _transformPlaceSelection(selection: PlaceSelection): CheckboxStates {
    const states: CheckboxStates = {};

    for (const [place, placeSelectionState] of Object.entries(selection)) {
      if (placeSelectionState === 'checked') {
        states[place] = 'checked';
      } else if (placeSelectionState === 'indeterminate') {
        states[place] = 'indeterminate';
      }
    }

    return states;
  }

  private _transformState(state: CheckboxStates): PlaceSelection {
    const placeSelection: PlaceSelection = {};

    for (const [place, checkboxState] of Object.entries(state)) {
      if (checkboxState === 'checked') {
        placeSelection[place] = 'checked';
      } else if (checkboxState === 'indeterminate') {
        placeSelection[place] = 'indeterminate';
      }
    }

    return placeSelection;
  }
}
