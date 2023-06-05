import { createIngredientTypeDto } from './ingredient-type-dto';

describe('createIngredientTypeDto', () => {
  it('creates default ingredient when no arguments are passed in', () => {
    const ingredient = createIngredientTypeDto({});
    expect(ingredient).toEqual({
      id: '',
      uid: '',
      name: '',
      ingredientIds: [],
    });
  });

  it('creates ingredient when arguments are passed in', () => {
    const ingredient = createIngredientTypeDto({
      id: '1',
      uid: '1',
      name: 'Spice',
      ingredientIds: ['A', 'B'],
    });
    expect(ingredient).toEqual({
      id: '1',
      uid: '1',
      name: 'Spice',
      ingredientIds: ['A', 'B'],
    });
  });
});
