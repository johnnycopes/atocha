import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { CountryDto } from './country-dto.interface';
import { SummaryDto } from './summary-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _countriesApiUrl = 'https://restcountries.com/v3.1/all';
  private readonly _wikipediaApiUrl =
    'https://en.wikipedia.org/api/rest_v1/page/summary/';

  constructor(private _http: HttpClient) {}

  fetchCountries(): Observable<CountryDto[]> {
    return this._http.get<CountryDto[]>(this._countriesApiUrl).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(() => {
        throw new Error('Network error');
      })
    );
  }

  fetchSummary(searchTerm: string): Observable<SummaryDto> {
    return this._http.get<SummaryDto>(this._wikipediaApiUrl + searchTerm).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(() => {
        throw new Error('Network error');
      })
    );
  }
}
