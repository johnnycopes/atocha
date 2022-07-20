import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Observable, of } from "rxjs";

import { CountryDto } from "@atocha/globetrotter/types";
import { CountryService } from "./country.service";
import { ApiService } from "./api.service";

describe('CountryService', () => {
  let service: CountryService;
  const mockApiService = {
    fetchCountries(): Observable<CountryDto[]> {
      return of([]);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: mockApiService,
        },
      ]
    });
    service = TestBed.inject(CountryService);
  });

  it('correctly initializes state', (done) => {
    service.countries$.subscribe((value) => {
      expect(value).toEqual({
        countries: [],
        countriesBySubregion: {},
        regions: [],
      });
      done();
    });
  });
});
