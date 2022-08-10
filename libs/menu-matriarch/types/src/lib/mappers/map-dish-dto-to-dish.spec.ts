import { createDishDto, createTagDto } from '../functions/create-dtos';
import { mapDishDtoToDish } from './map-dish-dto-to-dish';

describe('mapDishDtoToDish', () => {
  const dishDto = createDishDto({
    id: 'dish-1',
    uid: 'abc',
    name: 'Pizza',
    description: 'Delicious round vessel from Italy',
    link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
    menuIds: [],
    tagIds: ['tag-1'],
    usages: 2,
  });
  const tags = [
    createTagDto({
      id: 'tag-1',
      uid: 'abc',
      name: 'Vegetarian',
      dishIds: ['dish-1'],
    }),
  ];

  it('returns a dish when passed a dishDto and tags', () => {
    expect(mapDishDtoToDish(dishDto, tags)).toEqual({
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
          dishIds: ['dish-1'],
          id: 'tag-1',
          mealIds: [],
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
