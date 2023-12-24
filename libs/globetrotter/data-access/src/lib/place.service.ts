import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { ApiService } from './api.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { Places } from './internal/places';

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
  ) {
    this._loaderService.setGlobalLoader(true);
    this._apiService.fetchCountries().subscribe({
      next: (countryDtos) => {
        this._places.update(new Places(countryDtos));
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
    return this._apiService.fetchSummary(searchTerm);
  }
}
