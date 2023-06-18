import { createIngredientDto } from './ingredient-dto';

describe('createIngredientDto', () => {
  it('creates default ingredient when no arguments are passed in', () => {
    const ingredient = createIngredientDto({});
    expect(ingredient).toEqual({
      id: '',
      uid: '',
      name: '',
      typeId: '',
      dishIds: [],
    });
  });

  it('creates ingredient when arguments are passed in', () => {
    const ingredient = createIngredientDto({
      id: '1',
      uid: '1',
      name: 'Paprika',
      typeId: 'ingredient-type-1',
      dishIds: ['26'],
    });
    expect(ingredient).toEqual({
      id: '1',
      uid: '1',
      name: 'Paprika',
      typeId: 'ingredient-type-1',
      dishIds: ['26'],
    });
  });
});
