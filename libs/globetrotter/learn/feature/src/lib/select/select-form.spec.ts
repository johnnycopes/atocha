import { QuizType } from '@atocha/globetrotter/learn/util';
import { SelectForm } from './select-form';

describe('SelectForm', () => {
  let form: SelectForm;

  beforeEach(() => {
    form = new SelectForm(
      {
        type: QuizType.flagsCountries,
        quantity: 5,
        places: ['Central America', 'Eastern Europe', 'Micronesia'],
      },
      (placeName: string): number => {
        switch (placeName) {
          case 'Micronesia':
            return 8;
          case 'Eastern Europe':
            return 5;
          case 'Central America':
            return 3;
          default:
            return 0;
        }
      }
    );
  });

  it('has type property', () => {
    expect(form.type.value).toBe(QuizType.flagsCountries);
  });

  it('has quantity property', () => {
    expect(form.quantity.value).toBe(5);
  });

  it('has places property', () => {
    expect(form.places.value).toStrictEqual([
      'Central America',
      'Eastern Europe',
      'Micronesia',
    ]);
  });

  it('has no errors on form init', () => {
    expect(form.errors).toBe(null);
  });

  it('has error when form is invalid', () => {
    form.patchValue({ quantity: 1, places: [] });

    expect(form.errors).toStrictEqual({
      invalidQuantity: 'At least two cards must be selected',
      invalidPlaces: 'At least two countries must be selected',
      insufficientPlaces: 'Number of countries must exceed number of cards',
    });
  });
});
