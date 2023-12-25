import { Injectable } from '@angular/core';

import { State } from '@atocha/core/data-access';
import { ApiService } from './internal/api.service';
import { Country } from '@atocha/globetrotter/shared/util';
import { BehaviorSubject } from 'rxjs';
import { mapCountryDtoToCountry } from './internal/map-country-dto-to-country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  _countries$ = new BehaviorSubject<Country[]>([]);

  constructor(private _apiService: ApiService) {
    this._apiService
      .fetchCountries()
      .pipe(first())
      .subscribe({ next: mapCountryDtoToCountry });
  }
}
