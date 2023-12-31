import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { LocalStorageService, State } from '@atocha/core/data-access';
import { QuizType, Region, Selection } from '@atocha/globetrotter/learn/util';
import { mapRegionsToPlacesModel } from './internal/map-regions-to-places-model';
import { PlaceService } from './place.service';

interface SelectionParams {
  type: string;
  quantity: string;
  places: string;
}

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private readonly _key = 'SELECTION';
  private readonly _state = new State<Selection>(this._getSelection());

  selection$ = this._state.get().pipe(
    tap((selection) => {
      this._setSelection(selection);
    })
  );

  constructor(
    private _localStorageService: LocalStorageService,
    private _placeService: PlaceService
  ) {
    this._placeService.places$
      .pipe(map(({ regions }) => regions))
      .subscribe((regions) =>
        this._state.transformProp(
          'places',
          (places) =>
            places.length ? places : mapRegionsToPlacesModel(regions) // skip update if places were retrieved from local storage
        )
      );
  }

  updateSelection(selection: Selection): void {
    this._state.update(selection);
  }

  mapRegionsToPlacesModel(regions: Region[]): string[] {
    return mapRegionsToPlacesModel(regions);
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

  private _getSelection(): Selection {
    const selection = this._localStorageService.getItem(this._key);
    return selection
      ? JSON.parse(selection)
      : {
          type: QuizType.flagsCountries,
          quantity: 5,
          places: [],
        };
  }

  private _setSelection(selection: Selection): void {
    this._localStorageService.setItem(this._key, JSON.stringify(selection));
  }
}
