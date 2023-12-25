import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuizType, shuffle } from '@atocha/globetrotter/util';
import { QuizService } from './quiz.service';
import { PlaceService } from './place.service';
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
  SEYCHELLES_DTO,
} from './internal/mock-data/country-dtos';
import { Places } from './internal/places';

jest.mock('@atocha/globetrotter/util', () => ({
  QuizType: {
    flagsCountries: 1,
    capitalsCountries: 2,
    countriesCapitals: 3,
  },
  shuffle: jest.fn(<T>(arr: T[]) => arr.slice()),
}));

describe('QuizService', () => {
  let service: QuizService;
  const mockPlaceService: Pick<PlaceService, 'places$'> = {
    places$: of(
      new Places([
        DJIBOUTI_DTO,
        SEYCHELLES_DTO,
        MONTENEGRO_DTO,
        PHILIPPINES_DTO,
      ])
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: PlaceService,
          useValue: mockPlaceService,
        },
      ],
    });
    service = TestBed.inject(QuizService);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    expect(service).toBeTruthy();
    expect(jest.isMockFunction(shuffle)).toBeTruthy();
    expect(shuffle([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('has correct state after initializing quiz', (done) => {
    service.initializeQuiz({
      type: QuizType.flagsCountries,
      quantity: 2,
      places: ['Eastern Africa', 'Southeast Europe', 'South-Eastern Asia'],
    });

    service.quiz$.subscribe((value) => {
      expect(value).toEqual({
        items: [DJIBOUTI, SEYCHELLES],
        currentItem: DJIBOUTI,
        correctGuesses: 0,
        totalGuesses: 0,
        accuracy: 100,
        isComplete: false,
      });
      done();
    });
  });

  it('has correct state after updating quiz', (done) => {
    service.initializeQuiz({
      type: QuizType.flagsCountries,
      quantity: 4,
      places: ['Eastern Africa', 'Southeast Europe', 'South-Eastern Asia'],
    });

    service.updateQuiz(false);
    service.updateQuiz(false);
    service.updateQuiz(true);

    service.quiz$.subscribe((value) => {
      expect(value).toEqual({
        items: [DJIBOUTI, SEYCHELLES, MONTENEGRO, PHILIPPINES],
        currentItem: PHILIPPINES,
        correctGuesses: 1,
        totalGuesses: 3,
        accuracy: 33,
        isComplete: false,
      });
      done();
    });
  });
});
