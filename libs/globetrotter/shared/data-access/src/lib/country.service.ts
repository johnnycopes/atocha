import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { Country } from '@atocha/globetrotter/shared/util';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { ApiService } from './internal/api.service';
import { mapCountryDtoToCountry } from './internal/map-country-dto-to-country';
import { sort } from './internal/sort';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _countries = new State<{ countries: Country[] }>({ countries: [] });
  countries$ = this._countries.getProp('countries');

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
          this._countries.updateProp(
            'countries',
            sort(
              countryDtos
                .filter(({ unMember }) => unMember)
                .map(mapCountryDtoToCountry),
              ({ name }) => name
            )
          );
          this._loaderService.setGlobalLoader(false);
        },
        error: (error: { message: string }) => {
          this._errorService.setGlobalError(!!error);
          this._loaderService.setGlobalLoader(false);
        },
      });
  }
}
