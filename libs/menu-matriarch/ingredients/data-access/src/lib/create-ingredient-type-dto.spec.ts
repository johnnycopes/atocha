import { createIngredientTypeDto } from './create-ingredient-type-dto';

describe('createIngredientTypeDto', () => {
  it('creates default ingredient type when no arguments are passed in', () => {
    const ingredientType = createIngredientTypeDto({});
    expect(ingredientType).toEqual({
      id: '',
      uid: '',
      name: '',
      ingredientIds: [],
    });
  });

  it('creates ingredient type when arguments are passed in', () => {
    const ingredientType = createIngredientTypeDto({
      id: '1',
      uid: '1',
      name: 'Spice',
      ingredientIds: ['A', 'B'],
    });
    expect(ingredientType).toEqual({
      id: '1',
      uid: '1',
      name: 'Spice',
      ingredientIds: ['A', 'B'],
    });
  });
});
