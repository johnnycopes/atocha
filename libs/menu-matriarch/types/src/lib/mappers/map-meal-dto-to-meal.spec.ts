import {
  createDishDto,
  createMealDto,
  createTagDto,
} from '../functions/create-dtos';
import { mapDishDtoToDish } from './map-dish-dto-to-dish';
import { mapMealDtoToMeal } from './map-meal-dto-to-meal';

describe('mapMealDtoToMeal', () => {
  const mealDto = createMealDto({
    id: 'meal-1',
    uid: 'abc',
    name: 'Yin and Yang',
    description: 'Good and evil collide',
    dishIds: ['dish-1', 'dish-2'],
    tagIds: ['tag-1'],
  });
  const pizzaDto = createDishDto({
    id: 'dish-1',
    uid: 'abc',
    name: 'Pizza',
    description: 'Delicious round vessel from Italy',
    link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
    menuIds: [],
    tagIds: ['tag-1'],
    usages: 2,
  });
  const saladDto = createDishDto({
    id: 'dish-2',
    uid: 'abc',
    name: 'Salad',
    description: 'Leaves in a bowl. Gross!',
    link: '',
    menuIds: [],
    tagIds: ['tag-1'],
    usages: 4,
  });
  const tags = [
    createTagDto({
      id: 'tag-1',
      uid: 'abc',
      name: 'Vegetarian',
      dishIds: ['dish-1', 'dish-2'],
      mealIds: ['meal-1'],
    }),
  ];

  it('returns a meal when passed a mealDto and tags', () => {
    expect(
      mapMealDtoToMeal({
        mealDto,
        dishes: [
          mapDishDtoToDish(pizzaDto, tags),
          mapDishDtoToDish(saladDto, tags),
        ],
        tags,
      })
    ).toEqual({
      id: 'meal-1',
      uid: 'abc',
      name: 'Yin and Yang',
      description: 'Good and evil collide',
      dishes: [
        {
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
        },
        {
          description: 'Leaves in a bowl. Gross!',
          favorited: false,
          id: 'dish-2',
          ingredients: [],
          link: '',
          mealIds: [],
          menuIds: [],
          name: 'Salad',
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
          usages: 4,
        },
      ],
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
    });
  });
});
