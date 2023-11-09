import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { State } from '@atocha/core/data-access';
import {
  QuizType,
  Selection,
  SelectionParams,
  mapRegionsToPlacesModel,
} from '@atocha/globetrotter/util';
import { PlaceService } from './place.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private readonly _state = new State<Selection>({
    type: QuizType.flagsCountries,
    quantity: 5,
    places: [],
  });

  selection$ = this._state.get();

  constructor(private _placeService: PlaceService) {
    this._placeService.places$
      .pipe(map(({ regions }) => regions))
      .subscribe((regions) =>
        this.updatePlaces(mapRegionsToPlacesModel(regions))
      );
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

  updatePlaces(places: string[]): void {
    this._state.updateProp('places', places);
  }

  mapSelectionToQueryParams({
    type,
    quantity,
    places,
  }: Selection): SelectionParams {
    return {
      type: type.toString(),
      quantity: quantity.toString(),
      places: places.join(','),
    };
  }

  mapQueryParamsToSelection({
    type,
    quantity,
    places,
  }: SelectionParams): Selection {
    return {
      type: parseInt(type, 10) as QuizType,
      quantity: parseInt(quantity, 10),
      places: places.split(','),
    };
  }
}
