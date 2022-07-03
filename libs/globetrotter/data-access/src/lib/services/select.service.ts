import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { replace, map as _map } from 'lodash-es';

import {
  Region,
  QuizType,
  Selection,
  SelectionParams,
  CheckboxState,
  PlaceSelection,
} from '@atocha/globetrotter/types';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private readonly _paramDict: Record<string, string> = {
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
        first(),
        map(({ nestedCountries }) => nestedCountries)
      )
      .subscribe((regions) => {
        this.updatePlaces(this._mapToPlaceSelection(regions));
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
    const places = _map(
      selection.places,
      (value: CheckboxState, key) => key + this._paramDict[value]
    ).join(',');
    return {
      type,
      quantity,
      places,
    };
  }

  mapQueryParamsToSelection(queryParams: SelectionParams): Selection {
    const type = parseInt(queryParams.type, 10) as QuizType;
    const quantity = parseInt(queryParams.quantity, 10);
    const places = queryParams.places
      .split(',')
      .reduce((accum, current) => {
        if (current.includes(this._paramDict['checked'])) {
          const updatedKey = replace(current, this._paramDict['checked'], '');
          accum[updatedKey] = 'checked';
        } else if (current.includes(this._paramDict['indeterminate'])) {
          const updatedKey = replace(
            current,
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

  private _mapToPlaceSelection(regions: Region[]): PlaceSelection {
    const placeSelection: PlaceSelection = {};

    for (const { name, subregions } of regions) {
      placeSelection[name] = 'checked';
      for (const { name } of subregions) {
        placeSelection[name] = 'checked';
      }
    }

    return placeSelection;
  }
}
