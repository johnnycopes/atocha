import { Injectable } from '@angular/core';
import { Observable, first, map, tap } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { Country } from '@atocha/globetrotter/shared/util';
import { ApiService } from './internal/api.service';
import { mapCountryDtosToCountries } from './internal/map-country-dtos-to-countries';

// Overrides to API data
const COUNTRY_SUMMARY_NAMES: Readonly<Record<string, string>> = {
  Georgia: 'Georgia country',
};

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _countriesLoaded = false;
  private _countries = new State<{ countries: Country[] }>({ countries: [] });
  countries$ = this._countries.getProp('countries');

  constructor(private _apiService: ApiService) {}

  getCountries(): Observable<Country[]> {
    if (this._countriesLoaded) {
      throw new Error(
        'Cannot call `getCountries` more than once: countries data has already been loaded'
      );
    }
    this._countriesLoaded = true;
    return this._apiService.fetchCountries().pipe(
      first(),
      map(mapCountryDtosToCountries),
      tap((countries) => this._countries.updateProp('countries', countries))
    );
  }

  getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this._apiService
      .fetchSummary(searchTerm)
      .pipe(map(({ extract }) => extract));
  }
}
