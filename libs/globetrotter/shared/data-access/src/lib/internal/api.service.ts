import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, shareReplay } from 'rxjs';

import { CountryDto } from './country-dto.interface';
import { SummaryDto } from './summary-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);

  private readonly _countriesApiUrl =
    'https://restcountries.com/v3.1/independent?status=true&fields=area,capital,currencies,demonyms,flags,idd,languages,name,population,region,subregion,tld';
  private readonly _wikipediaApiUrl =
    'https://en.wikipedia.org/api/rest_v1/page/summary/';

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
