// TODO: remove this chunk after newer version of Jest is installed
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { mapIngredientTypeDtoToIngredientType } from './map-ingredient-type-dto-to-ingredient-type';
import { INGREDIENT_DTOS, INGREDIENT_TYPE_DTOS } from '../mock-data';

describe('mapIngredientTypeDtoToIngredientType', () => {
  it('returns an ingredientType when passed ingredients', () => {
    expect(
      mapIngredientTypeDtoToIngredientType(
        INGREDIENT_TYPE_DTOS[0],
        INGREDIENT_DTOS
      )
    ).toStrictEqual({
      id: 'ingredient-type-1',
      ingredients: [
        {
          dishIds: ['dish-1'],
          id: 'ingredient-2',
          name: 'Tomato sauce',
          typeId: 'ingredient-type-1',
          uid: 'abc',
        },
        {
          dishIds: ['dish-2'],
          id: 'ingredient-5',
          name: 'Walnuts',
          typeId: 'ingredient-type-1',
          uid: 'abc',
        },
      ],
      name: 'preserved',
      uid: 'abc',
    });

    expect(
      mapIngredientTypeDtoToIngredientType(
        INGREDIENT_TYPE_DTOS[1],
        INGREDIENT_DTOS
      )
    ).toStrictEqual({
      id: 'ingredient-type-2',
      ingredients: [
        {
          dishIds: ['dish-1'],
          id: 'ingredient-1',
          name: 'Dough',
          typeId: 'ingredient-type-2',
          uid: 'abc',
        },
        {
          dishIds: ['dish-1', 'dish-2'],
          id: 'ingredient-3',
          name: 'Goat cheese',
          typeId: 'ingredient-type-2',
          uid: 'abc',
        },
        {
          dishIds: ['dish-2'],
          id: 'ingredient-4',
          name: 'Spinach',
          typeId: 'ingredient-type-2',
          uid: 'abc',
        },
      ],
      name: 'refrigerated',
      uid: 'abc',
    });
  });
});
