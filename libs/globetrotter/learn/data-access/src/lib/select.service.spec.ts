import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PlaceService, Places } from '@atocha/globetrotter/shared/data-access';
import { QuizType } from '@atocha/globetrotter/learn/util';
import { SelectService } from './select.service';

describe('SelectService', () => {
  let service: SelectService;
  const mockPlaceService: Pick<PlaceService, 'places$'> = {
    places$: of(new Places()),
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
        places: [],
      });
      done();
    });
  });

  it('maps selection to selection query params', () => {
    expect(
      service.mapSelectionToQueryParams({
        type: QuizType.flagsCountries,
        quantity: 3,
        places: ['Northern Africa', 'Western Africa'],
      })
    ).toEqual({
      type: '1',
      quantity: '3',
      places: 'Northern Africa,Western Africa',
    });
  });

  it('maps selection query params to selection', () => {
    expect(
      service.mapQueryParamsToSelection({
        type: '2',
        quantity: '7',
        places: 'Melanesia,Micronesia,Polynesia',
      })
    ).toEqual({
      type: QuizType.capitalsCountries,
      quantity: 7,
      places: ['Melanesia', 'Micronesia', 'Polynesia'],
    });
  });
});
