import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CountryService } from './country.service';
import { PlaceService } from './place.service';
import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from './internal/mock-data/countries';

describe('PlaceService', () => {
  let service: PlaceService;
  const mockCountryService: Pick<CountryService, 'countries$'> = {
    countries$: of([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CountryService,
          useValue: mockCountryService,
        },
      ],
    });
    service = TestBed.inject(PlaceService);
  });

  it('correctly initializes state', (done) => {
    service.places$.subscribe((value) => {
      expect(value).toEqual({
        countries: [DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES],
        countriesBySubregion: {
          'Eastern Africa': [DJIBOUTI, SEYCHELLES],
          'Southeast Europe': [MONTENEGRO],
          'South-Eastern Asia': [PHILIPPINES],
        },
        regions: [
          {
            name: 'Africa',
            subregions: [
              {
                name: 'Eastern Africa',
                countries: [DJIBOUTI, SEYCHELLES],
              },
            ],
          },
          {
            name: 'Europe',
            subregions: [
              {
                name: 'Southeast Europe',
                countries: [MONTENEGRO],
              },
            ],
          },
          {
            name: 'Asia',
            subregions: [
              {
                name: 'South-Eastern Asia',
                countries: [PHILIPPINES],
              },
            ],
          },
        ],
      });
      done();
    });
  });
});
