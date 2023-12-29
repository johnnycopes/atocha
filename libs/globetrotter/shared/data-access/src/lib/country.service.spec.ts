import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CountryService } from './country.service';
import { ApiService } from './internal/api.service';
import {
  MONTENEGRO_DTO,
  PHILIPPINES_DTO,
  SEYCHELLES_DTO,
  PUERTO_RICO_DTO,
  DJIBOUTI_DTO,
} from './testing/country-dtos';
import { SummaryDto } from './internal/summary-dto.interface';
import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from './testing/countries';

describe('CountryService', () => {
  let service: CountryService;
  const mockApiService: Pick<ApiService, 'fetchCountries' | 'fetchSummary'> = {
    fetchCountries() {
      return of([
        MONTENEGRO_DTO,
        PHILIPPINES_DTO,
        SEYCHELLES_DTO,
        PUERTO_RICO_DTO,
        DJIBOUTI_DTO,
      ]);
    },

    fetchSummary() {
      return of({ extract: 'Country summary text' } as SummaryDto);
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
    service = TestBed.inject(CountryService);
  });

  it('renders', () => {
    expect(service).toBeTruthy();
  });

  it('returns countries state via on countries$ after calling getCountries', (done) => {
    service.getCountries().subscribe();
    service.countries$.subscribe((value) => {
      expect(value).toStrictEqual([
        DJIBOUTI,
        MONTENEGRO,
        PHILIPPINES,
        SEYCHELLES,
      ]);
      done();
    });
  });

  it('throws error if getCountries is called more than once', () => {
    service.getCountries().subscribe();
    expect(() => service.getCountries().subscribe()).toThrow();
  });

  it('returns summary when getSummary is called', (done) => {
    service.getSummary('bogus').subscribe((value) => {
      expect(value).toBe('Country summary text');
      done();
    });
  });
});
