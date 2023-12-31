import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  CountryService,
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from '@atocha/globetrotter/shared/data-access';
import { Places } from './internal/places';
import { PlaceService } from './place.service';

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
      expect(value).toStrictEqual(
        new Places([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES])
      );
      done();
    });
  });
});
