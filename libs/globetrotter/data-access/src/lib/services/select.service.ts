import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { replace, omitBy, map as _map } from 'lodash-es';

import {
  Region,
  QuizType,
  Selection,
  SelectionParams,
  CheckboxState,
  CheckboxStates,
} from '@atocha/globetrotter/types';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private readonly _paramDict: Record<CheckboxState, string> = {
    checked: '_c',
    indeterminate: '_i',
    unchecked: '',
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
        const checkboxStates = this._mapPlacesToCheckboxStates(regions);
        this.updatePlaces(checkboxStates);
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

  updatePlaces(places: CheckboxStates): void {
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
    const selectedPlaces = omitBy(
      selection.places,
      (value) => value === 'unchecked'
    );
    const places = _map(
      selectedPlaces,
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
        if (current.includes(this._paramDict.checked)) {
          const updatedKey = replace(current, this._paramDict.checked, '');
          accum[updatedKey] = 'checked';
        } else if (current.includes(this._paramDict.indeterminate)) {
          const updatedKey = replace(
            current,
            this._paramDict.indeterminate,
            ''
          );
          accum[updatedKey] = 'indeterminate';
        }
        return accum;
      }, {} as CheckboxStates);
    return {
      type,
      quantity,
      places,
    };
  }

  private _mapPlacesToCheckboxStates(regions: Region[]): CheckboxStates {
    const checkboxStates: CheckboxStates = {};

    for (const { name, subregions } of regions) {
      checkboxStates[name] = 'checked';
      for (const { name } of subregions) {
        checkboxStates[name] = 'checked';
      }
    }

    return checkboxStates;
  }
}
