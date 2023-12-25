import { Injectable } from '@angular/core';
import { Observable, first, map } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { Places } from './places';
import { ApiService } from './internal/api.service';
import { CountryDto } from './internal/country-dto.interface';
import { mapCountryDtoToCountry } from './internal/map-country-dto-to-country';
import { sort } from './internal/sort';

// Overrides to API data
const COUNTRY_SUMMARY_NAMES: Readonly<Record<string, string>> = {
  Georgia: 'Georgia country',
};

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private readonly _places = new State(new Places());
  places$ = this._places.get();

  constructor(
    private _apiService: ApiService,
    private _errorService: ErrorService,
    private _loaderService: LoaderService
  ) {}

  initialize() {
    this._loaderService.setGlobalLoader(true);
    this._apiService
      .fetchCountries()
      .pipe(first())
      .subscribe({
        next: (countryDtos) => {
          this._places.update(
            new Places(this._mapCountryDtosToCountries(countryDtos))
          );
          this._loaderService.setGlobalLoader(false);
        },
        error: (error: { message: string }) => {
          this._errorService.setGlobalError(!!error);
          this._loaderService.setGlobalLoader(false);
        },
      });
  }

  getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this._apiService
      .fetchSummary(searchTerm)
      .pipe(map((result) => result.extract));
  }

  private _mapCountryDtosToCountries(countryDtos: CountryDto[]) {
    return sort(
      countryDtos
        .filter(({ unMember }) => unMember)
        .map(mapCountryDtoToCountry),
      ({ name }) => name
    );
  }
}
