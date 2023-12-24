import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { ApiService } from './api.service';
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

  constructor(private _apiService: ApiService) {
    this._apiService
      .fetchCountries()
      .subscribe((countryDtos) => this._places.update(new Places(countryDtos)));
  }

  getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this._apiService.fetchSummary(searchTerm);
  }
}
