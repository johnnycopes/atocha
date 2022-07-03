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

import { CountryService, SelectService } from '@atocha/globetrotter/data-access';
import { Place, PlaceSelection } from '@atocha/globetrotter/types';
import { CheckboxStates } from '@atocha/globetrotter/ui';
import { PlacesTreeProvider, isSubregion } from './places-tree-provider';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCountriesComponent {
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
          treeProvider: new PlacesTreeProvider(region),
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

  getNumberOfCountries(item: Place): number {
    if (isSubregion(item)) {
      return item.countries.length;
    }
    return 0;
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
