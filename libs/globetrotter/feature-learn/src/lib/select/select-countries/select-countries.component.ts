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

import { CheckboxStates, Place } from '@atocha/globetrotter-types';
import {
  CountryService,
  isSubregion,
  PlacesTreeProvider,
  SelectService,
} from '@atocha/globetrotter-data-access';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCountriesComponent {
  private fullySelectedState: CheckboxStates = {};
  private _checkboxStates$ = this._selectService.selection.pipe(
    map(({ countries }) => countries)
  );
  private _regionData$ = this._countryService.countries.pipe(
    first(),
    map(({ nestedCountries }) => nestedCountries),
    tap((regions) => {
      this.fullySelectedState = regions.reduce((states, region) => {
        states[region.name] = 'checked';
        region.subregions.forEach(
          (subregion) => (states[subregion.name] = 'checked')
        );
        return states;
      }, {} as CheckboxStates);
    }),
    map((regions) =>
      regions.map((region) => {
        const treeProvider = new PlacesTreeProvider(region);
        const selectedSubject = new BehaviorSubject<number>(0);
        const totalSubject = new BehaviorSubject<number>(0);
        const selected$ = selectedSubject
          .asObservable()
          .pipe(distinctUntilChanged());
        const total$ = totalSubject
          .asObservable()
          .pipe(distinctUntilChanged());
        return {
          region: region as Place,
          treeProvider,
          selectedSubject,
          totalSubject,
          selected$,
          total$,
        };
      })
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  private _overallSelected$ = this._regionData$.pipe(
    map((regionData) =>
      regionData.map((regionDatum) => regionDatum.selected$)
    ),
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
    this._selectService.updateCountries(state);
  }

  onSelectAll(): void {
    this._selectService.updateCountries(this.fullySelectedState);
  }

  onClearAll(): void {
    this._selectService.updateCountries({});
  }

  getNumberOfCountries(item: Place): number {
    if (isSubregion(item)) {
      return item.countries.length;
    }
    return 0;
  }
}
