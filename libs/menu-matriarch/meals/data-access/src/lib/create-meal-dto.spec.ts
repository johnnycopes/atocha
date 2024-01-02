import { createMealDto } from './create-meal-dto';

describe('createMealDto', () => {
  it('creates default meal when no arguments are passed in', () => {
    const meal = createMealDto({});
    expect(meal).toStrictEqual({
      description: '',
      dishIds: [],
      id: '',
      name: '',
      tagIds: [],
      uid: '',
    });
  });

  it('creates menu when arguments are passed in', () => {
    const meal = createMealDto({
      description: 'Very tasty',
      dishIds: ['1', '2'],
      id: '3A',
      name: 'Southern Classic',
      tagIds: ['10'],
      uid: '1',
    });
    expect(meal).toStrictEqual({
      description: 'Very tasty',
      dishIds: ['1', '2'],
      id: '3A',
      name: 'Southern Classic',
      tagIds: ['10'],
      uid: '1',
    });
  });
});
