import { PIZZA, SALAD } from '@atocha/menu-matriarch/dishes/data-access';
import { TAG_DTOS } from '@atocha/menu-matriarch/tags/data-access';
import { mapMealDtoToMeal } from './map-meal-dto-to-meal';
import { MEAL_DTO } from '../mock-data';

describe('mapMealDtoToMeal', () => {
  it('returns a meal when passed a mealDto, dishes, and tags', () => {
    expect(
      mapMealDtoToMeal({
        mealDto: MEAL_DTO,
        dishes: [PIZZA, SALAD],
        tags: TAG_DTOS,
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
        },
        {
          description: 'Leaves in a bowl. Gross!',
          favorited: false,
          id: 'dish-2',
          ingredients: [
            {
              id: 'ingredient-3',
              uid: 'abc',
              name: 'Goat cheese',
              typeId: 'ingredient-type-2',
              dishIds: ['dish-1', 'dish-2'],
            },
            {
              id: 'ingredient-4',
              uid: 'abc',
              name: 'Spinach',
              typeId: 'ingredient-type-2',
              dishIds: ['dish-2'],
            },
            {
              id: 'ingredient-5',
              uid: 'abc',
              name: 'Walnuts',
              typeId: 'ingredient-type-1',
              dishIds: ['dish-2'],
            },
          ],
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
