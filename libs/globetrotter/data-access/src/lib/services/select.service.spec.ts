import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { QuizType } from '@atocha/globetrotter/types';
import { CountryService } from './country.service';
import { SelectService } from './select.service';

describe('SelectService', () => {
  let service: SelectService;
  const mockCountryService = {
    countries$: of({
      nestedCountries: [
        {
          name: 'Africa',
          subregions: [
            {
              name: 'Northern Africa',
              region: 'Africa',
            },
            {
              name: 'Western Africa',
              region: 'Africa',
            },
          ],
        },
      ],
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CountryService,
          useValue: mockCountryService,
        },
      ],
    });
    service = TestBed.inject(SelectService);
  });

  it('renders', () => {
    expect(service).toBeTruthy();
  });

  it('correctly initializes state', (done) => {
    service.selection$.subscribe((value) => {
      expect(value).toEqual({
        type: 1,
        quantity: 5,
        places: {
          Africa: 'checked',
          'Northern Africa': 'checked',
          'Western Africa': 'checked',
        },
      });
      done();
    });
  });

  it('maps selection to selection query params', () => {
    expect(
      service.mapSelectionToQueryParams({
        type: QuizType.flagsCountries,
        quantity: 3,
        places: {
          Asia: 'indeterminate',
          'Southern Asia': 'checked',
          'Western Asia': 'checked',
        },
      })
    ).toEqual({
      type: '1',
      quantity: '3',
      places: 'Asia_i,Southern Asia_c,Western Asia_c',
    });
  });

  it('maps selection query params to selection', () => {
    expect(
      service.mapQueryParamsToSelection({
        type: '2',
        quantity: '7',
        places: 'Oceania_i,Melanesia_c,Micronesia_c,Polynesia_c',
      })
    ).toEqual({
      type: QuizType.capitalsCountries,
      quantity: 7,
      places: {
        Oceania: 'indeterminate',
        Melanesia: 'checked',
        Micronesia: 'checked',
        Polynesia: 'checked',
      },
    });
  });
});
