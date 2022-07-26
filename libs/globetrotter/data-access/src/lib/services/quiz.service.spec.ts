import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuizType } from '@atocha/globetrotter/types';
import { QuizService } from "./quiz.service";
import { SelectService } from "./select.service";

describe('QuizService', () => {
  let service: QuizService;
  const mockSelectService: Pick<SelectService, 'selection$'> = {
    selection$: of({
      type: QuizType.flagsCountries,
      quantity: 3,
      places: {}
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: SelectService,
          useValue: mockSelectService,
        },
      ],
    });
    service = TestBed.inject(QuizService);
  });

  it('renders', () => {
    expect(service).toBeTruthy();
  });
});
