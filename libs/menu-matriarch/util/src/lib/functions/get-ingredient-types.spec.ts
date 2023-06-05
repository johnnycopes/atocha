import { getIngredientTypes } from './get-ingredient-types';

describe('getIngredientTypes', () => {
  it('returns ingredient types in alphabetical order', () => {
    expect(getIngredientTypes()).toEqual([
      'bread',
      'condiment',
      'dry good',
      'frozen',
      'grocery',
      'meat',
      'misc',
      'oil',
      'preserved',
      'produce',
      'refrigerated',
      'seafood',
      'spice',
    ]);
  });
});
