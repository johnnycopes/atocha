import { of } from 'rxjs';

import { CountryService } from '@atocha/globetrotter/shared/data-access';
import { Country } from '@atocha/globetrotter/shared/util';
import { ExploreService } from './explore.service';

describe('ExploreService', () => {
  let service: ExploreService;

  const DJIBOUTI = {
    name: 'Djibouti',
    capital: 'Djibouti',
    region: 'Africa',
    subregion: 'Eastern Africa',
  } as Country;

  const MONTENEGRO = {
    name: 'Montenegro',
    capital: 'Podgorica',
    region: 'Europe',
    subregion: 'Southeast Europe',
  } as Country;

  const PHILIPPINES = {
    name: 'Philippines',
    capital: 'Manila',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
  } as Country;

  const SEYCHELLES = {
    name: 'Seychelles',
    capital: 'Victoria',
    region: 'Africa',
    subregion: 'Eastern Africa',
  } as Country;

  beforeEach(() => {
    service = new ExploreService({
      countries$: of<Country[]>([
        DJIBOUTI,
        MONTENEGRO,
        PHILIPPINES,
        SEYCHELLES,
      ]),
      getCountries() {},
      getSummary(_: string) {
        return of('');
      },
    } as CountryService);
  });

  it('initializes with default state', (done) => {
    service.vm$.subscribe((state) => {
      expect(state).toStrictEqual({
        filteredCountries: [DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES],
        selectedCountry: DJIBOUTI,
        searchTerm: '',
        summary: '',
      });
      done();
    });
  });
});
