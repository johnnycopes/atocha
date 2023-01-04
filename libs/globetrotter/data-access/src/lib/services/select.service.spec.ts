import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { QuizType } from '@atocha/globetrotter/util';
import { PlaceService } from './place.service';
import { SelectService } from './select.service';

describe('SelectService', () => {
  let service: SelectService;
  const mockPlaceService: Pick<PlaceService, 'places$'> = {
    places$: of({
      countries: [],
      countriesBySubregion: {},
      regions: [
        {
          name: 'Africa',
          subregions: [
            {
              name: 'Northern Africa',
              countries: [],
            },
            {
              name: 'Western Africa',
              countries: [],
            },
          ],
        },
      ],
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PlaceService,
          useValue: mockPlaceService,
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
        model: ['Northern Africa', 'Western Africa'],
      });
      done();
    });
  });

  // it('maps selection to selection query params', () => {
  //   expect(
  //     service.mapSelectionToQueryParams({
  //       type: QuizType.flagsCountries,
  //       quantity: 3,
  //       places: {
  //         Asia: 'indeterminate',
  //         'Southern Asia': 'checked',
  //         'Western Asia': 'checked',
  //       },
  //       model: ['Northern Africa', 'Western Africa'],
  //     })
  //   ).toEqual({
  //     type: '1',
  //     quantity: '3',
  //     places: 'Asia_i,Southern Asia_c,Western Asia_c',
  //     model: 'Northern Africa,Western Africa',
  //   });
  // });

  // it('maps selection query params to selection', () => {
  //   expect(
  //     service.mapQueryParamsToSelection({
  //       type: '2',
  //       quantity: '7',
  //       places: 'Oceania_i,Melanesia_c,Micronesia_c,Polynesia_c',
  //       model: 'Melanesia,Micronesia,Polynesia',
  //     })
  //   ).toEqual({
  //     type: QuizType.capitalsCountries,
  //     quantity: 7,
  //     places: {
  //       Oceania: 'indeterminate',
  //       Melanesia: 'checked',
  //       Micronesia: 'checked',
  //       Polynesia: 'checked',
  //     },
  //     model: ['Melanesia', 'Micronesia', 'Polynesia'],
  //   });
  // });
});
