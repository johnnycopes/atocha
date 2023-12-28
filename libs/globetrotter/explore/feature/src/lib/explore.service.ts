import { Injectable } from '@angular/core';

import { State } from '@atocha/core/data-access';
import { includes } from '@atocha/core/util';
import { CountryService } from '@atocha/globetrotter/shared/data-access';
import { Country } from '@atocha/globetrotter/shared/util';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  tap,
  switchMap,
} from 'rxjs';

@Injectable()
export class ExploreService {
  private _state = new State<{
    selectedCountry: Country | undefined;
    searchTerm: string;
  }>({
    selectedCountry: undefined,
    searchTerm: '',
  });

  private _countries$ = this._countryService.countries$;

  private _summary$ = this._state.getProp('selectedCountry').pipe(
    switchMap((country) => {
      if (!country) {
        return of('');
      }
      return this._countryService.getSummary(country.name);
    }),
    distinctUntilChanged()
  );

  private _filteredCountries$ = this._state.getProp('searchTerm').pipe(
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
    this._state.get(),
    this._filteredCountries$,
    this._summary$,
  ]).pipe(
    map(([{ selectedCountry, searchTerm }, filteredCountries, summary]) => ({
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
    this._state.updateProp('searchTerm', searchTerm);
  }

  private _selectCountry(country: Country) {
    this._state.updateProp('selectedCountry', country);
  }
}
