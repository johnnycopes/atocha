import { createIngredientDto } from './create-ingredient-dto';

describe('createIngredientDto', () => {
  it('creates default ingredient when no arguments are passed in', () => {
    const ingredient = createIngredientDto({});
    expect(ingredient).toStrictEqual({
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
    expect(ingredient).toStrictEqual({
      id: '1',
      uid: '1',
      name: 'Paprika',
      typeId: 'ingredient-type-1',
      dishIds: ['26'],
    });
  });
});
