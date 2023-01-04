import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { State } from '@atocha/core/util';
import {
  QuizType,
  Selection,
  SelectionParams,
  PlaceSelection,
  PlaceSelectionState,
  mapRegionsToPlaceSelection,
  mapRegionsToPlaceModel,
} from '@atocha/globetrotter/util';
import { PlaceService } from './place.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private readonly _state = new State<Selection>({
    type: QuizType.flagsCountries,
    quantity: 5,
    places: {},
    model: [],
  });
  private readonly _paramDict: Record<PlaceSelectionState, string> = {
    checked: '_c',
    indeterminate: '_i',
  };

  selection$ = this._state.get();

  constructor(private _placeService: PlaceService) {
    this._placeService.places$
      .pipe(map(({ regions }) => regions))
      .subscribe((regions) => {
        this.updatePlaces(mapRegionsToPlaceSelection(regions));
        this.updateModel(mapRegionsToPlaceModel(regions));
      });
  }

  updateSelection(selection: Selection): void {
    this._state.update(selection);
  }

  updateType(type: QuizType): void {
    this._state.updateProp('type', type);
  }

  updateQuantity(quantity: number): void {
    this._state.updateProp('quantity', quantity);
  }

  updatePlaces(places: PlaceSelection): void {
    this._state.updateProp('places', places);
  }

  updateModel(model: string[]): void {
    this._state.updateProp('model', model);
  }

  mapSelectionToQueryParams(selection: Selection): SelectionParams {
    const type = selection.type.toString();
    const quantity = selection.quantity.toString();
    const places = Object.entries(selection.places)
      .map(([place, state]) => place + this._paramDict[state])
      .join(',');
    const model = '';
    return {
      type,
      quantity,
      places,
      model,
    };
  }

  mapQueryParamsToSelection(queryParams: SelectionParams): Selection {
    const type = parseInt(queryParams.type, 10) as QuizType;
    const quantity = parseInt(queryParams.quantity, 10);
    const places = queryParams.places.split(',').reduce((accum, current) => {
      if (current.includes(this._paramDict['checked'])) {
        const updatedKey = current.replace(this._paramDict['checked'], '');
        accum[updatedKey] = 'checked';
      } else if (current.includes(this._paramDict['indeterminate'])) {
        const updatedKey = current.replace(
          this._paramDict['indeterminate'],
          ''
        );
        accum[updatedKey] = 'indeterminate';
      }
      return accum;
    }, {} as PlaceSelection);
    const model: string[] = [];
    return {
      type,
      quantity,
      places,
      model,
    };
  }
}
