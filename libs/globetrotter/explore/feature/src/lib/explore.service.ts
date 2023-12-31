import { Injectable } from '@angular/core';
import { combineLatest, map, of, tap, switchMap, first } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { includes } from '@atocha/core/util';
import { CountryService } from '@atocha/globetrotter/shared/data-access';
import { Country } from '@atocha/globetrotter/shared/util';

@Injectable()
export class ExploreService {
  private _state = new State<{
    selectedCountry: Country | undefined;
    searchTerm: string;
  }>({
    selectedCountry: undefined,
    searchTerm: '',
  });
  private _filteredCountries$ = this._state.getProp('searchTerm').pipe(
    switchMap((searchTerm, index) =>
      this._countryService.countries$.pipe(
        first(),
        tap((countries) => {
          if (index === 0) {
            this._state.updateProp('selectedCountry', countries[0]);
          }
        }),
        map((countries) =>
          countries.filter(({ name, capital }) =>
            includes([name, capital], searchTerm)
          )
        )
      )
    )
  );
  private _summary$ = this._state
    .getProp('selectedCountry')
    .pipe(
      switchMap((country) =>
        country ? this._countryService.getSummary(country.name) : of('')
      )
    );

  state$ = combineLatest([
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

  select(country: Country): void {
    this._state.updateProp('selectedCountry', country);
  }

  search(searchTerm: string): void {
    this._state.updateProp('searchTerm', searchTerm);
  }
}
