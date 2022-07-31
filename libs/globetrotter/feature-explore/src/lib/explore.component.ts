import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  startWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { includes } from '@atocha/core/util';
import { fadeInAnimation } from '@atocha/globetrotter/ui';
import { PlaceService } from '@atocha/globetrotter/data-access';
import { Country } from '@atocha/globetrotter/types';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ExploreComponent {
  private _searchTermChange = new Subject<string>();
  private _selectedCountryChange = new BehaviorSubject<Country | undefined>(
    undefined
  );
  private _countries$ = this._placeService.places$.pipe(
    map(({ countries }) => countries)
  );
  private _selectedCountry$ = this._selectedCountryChange.pipe(
    distinctUntilChanged()
  );
  private _summary$ = this._selectedCountryChange.pipe(
    switchMap((country) => {
      if (!country) {
        return of(undefined);
      }
      return this._placeService.getSummary(country.name);
    }),
    distinctUntilChanged()
  );
  private _searchTerm$ = this._searchTermChange.pipe(
    startWith(''),
    debounceTime(100),
    distinctUntilChanged()
  );
  private _filteredCountries$ = this._searchTerm$.pipe(
    switchMap((searchTerm, index) =>
      this._countries$.pipe(
        tap((countries) => (index === 0 ? this.onSelect(countries[0]) : null)),
        map((countries) =>
          countries.filter(({ name, capital }) =>
            includes([name, capital], searchTerm)
          )
        )
      )
    )
  );
  vm$ = combineLatest([
    this._filteredCountries$,
    this._selectedCountry$,
    this._searchTerm$,
    this._summary$,
  ]).pipe(
    map(([filteredCountries, selectedCountry, searchTerm, summary]) => {
      if (!filteredCountries.length || !summary) {
        return undefined;
      }
      return {
        filteredCountries,
        selectedCountry,
        searchTerm,
        summary,
      };
    })
  );

  constructor(private _placeService: PlaceService) {}

  getCountryId({ id }: Country): string {
    return id;
  }

  onSelect(selectedCountry: Country): void {
    this._selectedCountryChange.next(selectedCountry);
  }

  onSearch(searchTerm: string): void {
    this._searchTermChange.next(searchTerm);
  }
}
