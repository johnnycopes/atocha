import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
  map,
  tap,
  first,
  distinctUntilChanged,
  switchMap,
  shareReplay,
} from 'rxjs/operators';

import { CheckboxStates } from '@atocha/ui-globetrotter';
import { Region, Subregion } from '@atocha/types-globetrotter';
import { CountryService, PlacesTreeProvider, SelectService } from '@atocha/data-access-globetrotter';

interface IRegionData {
  region: Region;
  treeProvider: PlacesTreeProvider;
  selectedSubject: BehaviorSubject<number>;
  totalSubject: BehaviorSubject<number>;
  selected$: Observable<number>;
  total$: Observable<number>;
}

interface IViewModel {
  regionData: IRegionData[];
  checkboxStates: CheckboxStates;
  overallSelected: number;
  overallTotal: number;
}

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCountriesComponent implements OnInit {
  vm$: Observable<IViewModel>;
  private regionData$: Observable<IRegionData[]>;
  private checkboxStates$: Observable<CheckboxStates>;
  private overallSelected$: Observable<number>;
  private overallTotal$: Observable<number>;
  private fullySelectedState: CheckboxStates;

  constructor(
    private _countryService: CountryService,
    private _selectService: SelectService
  ) {}

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.regionData$,
      this.checkboxStates$,
      this.overallSelected$,
      this.overallTotal$,
    ]).pipe(
      map(([regionData, checkboxStates, overallSelected, overallTotal]) => ({
        regionData,
        checkboxStates,
        overallSelected,
        overallTotal,
      }))
    );
  }

  onCountriesChange(state: CheckboxStates): void {
    this._selectService.updateCountries(state);
  }

  onSelectAll(): void {
    this._selectService.updateCountries(this.fullySelectedState);
  }

  onClearAll(): void {
    this._selectService.updateCountries({});
  }

  getNumberOfCountries(item: Subregion): number {
    return item.countries.length;
  }

  private initializeStreams(): void {
    this.checkboxStates$ = this._selectService.selection.pipe(
      map(({ countries }) => countries)
    );
    this.regionData$ = this._countryService.countries.pipe(
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
            region,
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
    this.overallSelected$ = this.regionData$.pipe(
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
    this.overallTotal$ = this.regionData$.pipe(
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
  }
}
