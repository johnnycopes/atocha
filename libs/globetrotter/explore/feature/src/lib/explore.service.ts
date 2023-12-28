import { Injectable } from '@angular/core';
import { includes } from '@atocha/core/util';
import { CountryService } from '@atocha/globetrotter/shared/data-access';
import { Country } from '@atocha/globetrotter/shared/util';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  tap,
  startWith,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  private _searchTermChange = new Subject<string>();
  private _selectedCountryChange = new BehaviorSubject<Country | undefined>(
    undefined
  );
  private _countries$ = this._countryService.countries$;
  private _selectedCountry$ = this._selectedCountryChange.pipe(
    distinctUntilChanged()
  );
  private _summary$ = this._selectedCountryChange.pipe(
    switchMap((country) => {
      if (!country) {
        return of('');
      }
      return this._countryService.getSummary(country.name);
    }),
    distinctUntilChanged()
  );
  private _searchTerm$ = this._searchTermChange.pipe(
    startWith(''),
    distinctUntilChanged()
  );
  private _filteredCountries$ = this._searchTerm$.pipe(
    switchMap((searchTerm, index) =>
      this._countries$.pipe(
        tap((countries) =>
          index === 0 ? this._selectCountry(countries[0]) : null
        ),
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
    map(([filteredCountries, selectedCountry, searchTerm, summary]) => ({
      filteredCountries,
      selectedCountry,
      searchTerm,
      summary,
    }))
  );

  constructor(private _countryService: CountryService) {}

  onSelect(selectedCountry: Country): void {
    this._selectCountry(selectedCountry);
  }

  onSearch(searchTerm: string): void {
    this._searchTermChange.next(searchTerm);
  }

  private _selectCountry(country: Country) {
    this._selectedCountryChange.next(country);
  }
}
