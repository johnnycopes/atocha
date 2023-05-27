import { mapDishDtoToDish } from './map-dish-dto-to-dish';
import { INGREDIENT_DTOS, PIZZA_DTO, TAG_DTOS } from './mock-data';

describe('mapDishDtoToDish', () => {
  it('returns a dish when passed a dishDto and tags', () => {
    expect(mapDishDtoToDish(PIZZA_DTO, INGREDIENT_DTOS, TAG_DTOS)).toEqual({
      description: 'Delicious round vessel from Italy',
      favorited: false,
      id: 'dish-1',
      ingredients: [
        {
          id: 'ingredient-1',
          uid: 'abc',
          name: 'Dough',
          type: 'bread',
          dishIds: ['dish-1'],
        },
        {
          id: 'ingredient-2',
          uid: 'abc',
          name: 'Tomato sauce',
          type: 'preserved',
          dishIds: ['dish-1'],
        },
        {
          id: 'ingredient-3',
          uid: 'abc',
          name: 'Goat cheese',
          type: 'refrigerated',
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
