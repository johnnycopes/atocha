// TODO: remove this chunk after newer version of Jest is installed
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fetch, Response } = require('util');
global.fetch = fetch;
global.Response = Response;

import { TAG_DTOS } from '@atocha/menu-matriarch/tags/data-access';
import { INGREDIENT_DTOS } from '@atocha/menu-matriarch/ingredients/data-access';

import { mapDishDtoToDish } from './map-dish-dto-to-dish';
import { PIZZA_DTO } from '../mock-data';

describe('mapDishDtoToDish', () => {
  it('returns a dish when passed a dishDto and tags', () => {
    expect(
      mapDishDtoToDish(PIZZA_DTO, INGREDIENT_DTOS, TAG_DTOS)
    ).toStrictEqual({
      description: 'Delicious round vessel from Italy',
      favorited: false,
      id: 'dish-1',
      ingredients: [
        {
          id: 'ingredient-1',
          uid: 'abc',
          name: 'Dough',
          typeId: 'ingredient-type-2',
          dishIds: ['dish-1'],
        },
        {
          id: 'ingredient-2',
          uid: 'abc',
          name: 'Tomato sauce',
          typeId: 'ingredient-type-1',
          dishIds: ['dish-1'],
        },
        {
          id: 'ingredient-3',
          uid: 'abc',
          name: 'Goat cheese',
          typeId: 'ingredient-type-2',
          dishIds: ['dish-1', 'dish-2'],
        },
      ],
      link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
      mealIds: [],
      menuIds: [],
      name: 'Pizza',
      notes: '',
      tags: [
        {
          color: '',
          dishIds: ['dish-1', 'dish-2'],
          id: 'tag-1',
          mealIds: ['meal-1'],
          name: 'Vegetarian',
          uid: 'abc',
        },
      ],
      type: 'main',
      uid: 'abc',
      usages: 2,
    });
  });
});
