import { mapDishDtoToDish } from './map-dish-dto-to-dish';
import { PIZZA_DTO, TAG_DTOS } from './mock-data';

describe('mapDishDtoToDish', () => {
  it('returns a dish when passed a dishDto and tags', () => {
    expect(mapDishDtoToDish(PIZZA_DTO, TAG_DTOS)).toEqual({
      description: 'Delicious round vessel from Italy',
      favorited: false,
      id: 'dish-1',
      ingredients: [],
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
