import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  map,
  tap,
  first,
  distinctUntilChanged,
  switchMap,
  shareReplay,
} from 'rxjs/operators';

import { CheckboxStates } from '@atocha/core/ui';
import {
  CountryService,
  SelectService,
} from '@atocha/globetrotter/data-access';
import {
  Place,
  PlaceSelection,
  isSubregion,
  isRegion,
} from '@atocha/globetrotter/types';

@Component({
  selector: 'app-select-places',
  templateUrl: './select-places.component.html',
  styleUrls: ['./select-places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlacesComponent {
  private _fullySelectedState: PlaceSelection = {};
  private _checkboxStates$ = this._selectService.selection.pipe(
    map(({ places }) => places)
  );
  private _regionData$ = this._countryService.countries.pipe(
    first(),
    map(({ nestedCountries }) => nestedCountries),
    tap((regions) => {
      this._fullySelectedState = regions.reduce((states, region) => {
        states[region.name] = 'checked';
        region.subregions.forEach(
          (subregion) => (states[subregion.name] = 'checked')
        );
        return states;
      }, {} as PlaceSelection);
    }),
    map((regions) =>
      regions.map((region) => {
        const selectedSubject = new BehaviorSubject<number>(0);
        const totalSubject = new BehaviorSubject<number>(0);
        return {
          region: region as Place,
          selectedSubject,
          totalSubject,
          selected$: selectedSubject.pipe(distinctUntilChanged()),
          total$: totalSubject.pipe(distinctUntilChanged()),
        };
      })
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  private _overallSelected$ = this._regionData$.pipe(
    map((regionData) => regionData.map((regionDatum) => regionDatum.selected$)),
    switchMap((selectedArr$) =>
      combineLatest(selectedArr$).pipe(
        map(([...values]) =>
          values.reduce((accum, current) => accum + current, 0)
        )
      )
    ),
    distinctUntilChanged()
  );
  private _overallTotal$ = this._regionData$.pipe(
    map((regionData) => regionData.map((regionDatum) => regionDatum.total$)),
    switchMap((totals$) =>
      combineLatest(totals$).pipe(
        map(([...values]) =>
          values.reduce((accum, current) => accum + current, 0)
        )
      )
    ),
    distinctUntilChanged()
  );
  vm$ = combineLatest([
    this._regionData$,
    this._checkboxStates$,
    this._overallSelected$,
    this._overallTotal$,
  ]).pipe(
    map(([regionData, checkboxStates, overallSelected, overallTotal]) => ({
      regionData,
      checkboxStates,
      overallSelected,
      overallTotal,
    }))
  );

  getId = ({ name }: Place) => name;

  getChildren = (place: Place): Place[] =>
    isRegion(place) ? place.subregions : [];

  getNumberOfCountries = (place: Place) =>
    isSubregion(place) ? place.countries.length : 0;

  constructor(
    private _countryService: CountryService,
    private _selectService: SelectService
  ) {}

  onCountriesChange(state: CheckboxStates): void {
    this._selectService.updatePlaces(this._transformState(state));
  }

  onSelectAll(): void {
    this._selectService.updatePlaces(this._fullySelectedState);
  }

  onClearAll(): void {
    this._selectService.updatePlaces({});
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
