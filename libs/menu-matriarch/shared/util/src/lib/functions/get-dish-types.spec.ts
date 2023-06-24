import { getDishTypes } from './get-dish-types';

describe('getDishTypes', () => {
  it('returns dish types in correct order', () => {
    expect(getDishTypes()).toEqual(['main', 'side', 'dessert']);
  });
});
