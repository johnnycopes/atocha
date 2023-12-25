import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Country, QuizType, shuffle } from '@atocha/globetrotter/shared/util';
import { PlaceService, Places } from '@atocha/globetrotter/shared/data-access';
import { QuizService } from './quiz.service';

jest.mock('@atocha/globetrotter/shared/util', () => ({
  QuizType: {
    flagsCountries: 1,
    capitalsCountries: 2,
    countriesCapitals: 3,
  },
  shuffle: jest.fn(<T>(arr: T[]) => arr.slice()),
}));

describe('QuizService', () => {
  const DJIBOUTI = {
    name: 'Djibouti',
    region: 'Africa',
    subregion: 'Eastern Africa',
  } as Country;

  const MONTENEGRO = {
    name: 'Montenegro',
    region: 'Europe',
    subregion: 'Southeast Europe',
  } as Country;

  const PHILIPPINES = {
    name: 'Philippines',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
  } as Country;

  const SEYCHELLES = {
    name: 'Seychelles',
    region: 'Africa',
    subregion: 'Eastern Africa',
  } as Country;

  const mockPlaceService: Pick<PlaceService, 'places$'> = {
    places$: of(new Places([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES])),
  };

  let service: QuizService;

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
