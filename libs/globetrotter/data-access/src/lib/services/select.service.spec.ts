import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SelectService } from './select.service';
import { QuizType } from '@atocha/globetrotter/types';

describe('SelectService', () => {
  let service: SelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SelectService);
  });

  it('renders', () => {
    expect(service).toBeTruthy();
  });

  it('maps a selection to selection query params', () => {
    expect(service.mapSelectionToQueryParams({
      type: QuizType.flagsCountries,
      quantity: 3,
      places: {
        Asia: 'indeterminate',
        'Southern Asia': 'checked',
        'Western Asia': 'checked',
      },
    })).toEqual({
      type: "1",
      quantity: "3",
      places: "Asia_i,Southern Asia_c,Western Asia_c",
    });
  });

  it('maps selection query params to a selection', () => {
    expect(service.mapQueryParamsToSelection({
      type: '2',
      quantity: '7',
      places: 'Oceania_i,Melanesia_c,Micronesia_c,Polynesia_c',
    })).toEqual({
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
