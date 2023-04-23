import { getIngredientTypes } from './get-ingredient-types';

describe('getIngredientTypes', () => {
  it('returns ingredient types in alphabetical order', () => {
    expect(getIngredientTypes()).toEqual([
      'bread/bakery',
      'canned/jarred',
      'condiment',
      'dry good',
      'frozen',
      'grocery',
      'meat/seafood',
      'oil',
      'produce',
      'refrigerated',
      'spice',
      'misc',
    ]);
  });
});
