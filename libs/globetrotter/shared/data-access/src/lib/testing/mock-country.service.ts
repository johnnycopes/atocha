import { Observable, of } from 'rxjs';

import { DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES } from './countries';

export class MockCountryService {
  countries$ = of([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES]);

  getSummary(countryName: string): Observable<string> {
    return of(`Summary text about ${countryName}`);
  }
}
