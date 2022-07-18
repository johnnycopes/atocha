import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';

import {
  Region,
  QuizType,
  Selection,
  SelectionParams,
  PlaceSelection,
  PlaceSelectionState,
} from '@atocha/globetrotter/types';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private readonly _paramDict: Record<PlaceSelectionState, string> = {
    checked: '_c',
    indeterminate: '_i',
  };
  private readonly _selection: BehaviorSubject<Selection>;
  get selection(): BehaviorSubject<Selection> {
    return this._selection;
  }

  constructor(private _countryService: CountryService) {
    this._selection = new BehaviorSubject<Selection>({
      type: QuizType.flagsCountries,
      quantity: 5,
      places: {},
    });
    this._countryService.countries
      .pipe(
        map(({ nestedCountries }) => nestedCountries)
      )
      .subscribe((regions) => {
        this.updatePlaces(this._mapRegionsToPlaceSelection(regions));
      });
  }

  updateSelection(selection: Selection): void {
    this._selection.next(selection);
  }

  updateType(type: QuizType): void {
    this._selection
      .pipe(
        first(),
        map((selection) => ({ ...selection, type }))
      )
      .subscribe((selection) => this._selection.next(selection));
  }

  updateQuantity(quantity: number): void {
    this._selection
      .pipe(
        first(),
        map((selection) => ({ ...selection, quantity }))
      )
      .subscribe((selection) => this._selection.next(selection));
  }

  updatePlaces(places: PlaceSelection): void {
    this._selection
      .pipe(
        first(),
        map((selection) => ({ ...selection, places }))
      )
      .subscribe((selection) => this._selection.next(selection));
  }

  mapSelectionToQueryParams(selection: Selection): SelectionParams {
    const type = selection.type.toString();
    const quantity = selection.quantity.toString();
    const places = Object.entries(selection.places)
      .map(([place, state]) => place + this._paramDict[state])
      .join(',');
    return {
      type,
      quantity,
      places,
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
    return {
      type,
      quantity,
      places,
    };
  }

  private _mapRegionsToPlaceSelection(regions: Region[]): PlaceSelection {
    const placeSelection: PlaceSelection = {};

    for (const { name, subregions } of regions) {
      placeSelection[name] = 'checked';
      for (const { name } of subregions) {
        placeSelection[name] = 'checked';
      }
    }

    console.log(placeSelection);
    return placeSelection;
  }
}
