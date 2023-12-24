import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { Summary } from '@atocha/globetrotter/util';
import { CountryDto } from './country-dto.interface';

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

  fetchSummary(searchTerm: string): Observable<string> {
    return this._http.get<Summary>(this._wikipediaApiUrl + searchTerm).pipe(
      map((result) => result.extract),
      catchError(() => of('A summary of this country could not be found.'))
    );
  }
}
