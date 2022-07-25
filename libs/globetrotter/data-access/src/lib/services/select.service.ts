import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';

import {
  QuizType,
  Selection,
  SelectionParams,
  PlaceSelection,
  PlaceSelectionState,
  mapRegionsToPlaceSelection,
} from '@atocha/globetrotter/types';
import { PlaceService } from './place.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private _paramDict: Record<PlaceSelectionState, string> = {
    checked: '_c',
    indeterminate: '_i',
  };
  private _selectionSubject = new BehaviorSubject<Selection>({
    type: QuizType.flagsCountries,
    quantity: 5,
    places: {},
  });
  selection$ = this._selectionSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _countryService: PlaceService) {
    this._countryService.places$
      .pipe(map(({ regions }) => regions))
      .subscribe((regions) => {
        this.updatePlaces(mapRegionsToPlaceSelection(regions));
      });
  }

  updateSelection(selection: Selection): void {
    this._selectionSubject.next(selection);
  }

  updateType(type: QuizType): void {
    this._selectionSubject
      .pipe(
        first(),
        map((selection) => ({ ...selection, type }))
      )
      .subscribe((selection) => this._selectionSubject.next(selection));
  }

  updateQuantity(quantity: number): void {
    this._selectionSubject
      .pipe(
        first(),
        map((selection) => ({ ...selection, quantity }))
      )
      .subscribe((selection) => this._selectionSubject.next(selection));
  }

  updatePlaces(places: PlaceSelection): void {
    this._selectionSubject
      .pipe(
        first(),
        map((selection) => ({ ...selection, places }))
      )
      .subscribe((selection) => this._selectionSubject.next(selection));
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
}
