import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PlaceService } from './place.service';
import { ApiService } from './internal/api.service';
import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from './internal/mock-data/countries';
import {
  DJIBOUTI_DTO,
  MONTENEGRO_DTO,
  PHILIPPINES_DTO,
  PUERTO_RICO_DTO,
  SEYCHELLES_DTO,
} from './internal/mock-data/country-dtos';

describe('PlaceService', () => {
  let service: PlaceService;
  const mockApiService: Pick<ApiService, 'fetchCountries'> = {
    fetchCountries() {
      return of([
        MONTENEGRO_DTO,
        PHILIPPINES_DTO,
        SEYCHELLES_DTO,
        PUERTO_RICO_DTO,
        DJIBOUTI_DTO,
      ]);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: mockApiService,
        },
      ],
    });
    service = TestBed.inject(PlaceService);
    service.initialize();
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
