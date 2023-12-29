import { of } from 'rxjs';

import {
  CountryService,
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from '@atocha/globetrotter/shared/data-access';
import { ExploreService } from './explore.service';

describe('ExploreService', () => {
  let service: ExploreService;
  const mockCountryService = {
    countries$: of([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES]),
    getSummary: (countryName: string) => of(`Summary for ${countryName}`),
  } as CountryService;

  beforeEach(() => {
    service = new ExploreService(mockCountryService);
  });

  it('initializes with default state', (done) => {
    service.state$.subscribe((state) => {
      expect(state).toStrictEqual({
        filteredCountries: [DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES],
        selectedCountry: DJIBOUTI,
        searchTerm: '',
        summary: 'Summary for Djibouti',
      });
      done();
    });
  });
});
