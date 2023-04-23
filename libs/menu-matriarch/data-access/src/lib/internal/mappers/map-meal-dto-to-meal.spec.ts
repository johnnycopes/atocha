import { mapDishDtoToDish } from './map-dish-dto-to-dish';
import { mapMealDtoToMeal } from './map-meal-dto-to-meal';
import {
  INGREDIENT_DTOS,
  MEAL_DTO,
  PIZZA_DTO,
  TAG_DTOS,
  SALAD_DTO,
} from './mock-data';

describe('mapMealDtoToMeal', () => {
  it('returns a meal when passed a mealDto, dishes, and tags', () => {
    expect(
      mapMealDtoToMeal({
        mealDto: MEAL_DTO,
        dishes: [
          mapDishDtoToDish(PIZZA_DTO, INGREDIENT_DTOS, TAG_DTOS),
          mapDishDtoToDish(SALAD_DTO, INGREDIENT_DTOS, TAG_DTOS),
        ],
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
              type: 'bread/bakery',
              dishIds: ['dish-1'],
            },
            {
              id: 'ingredient-2',
              uid: 'abc',
              name: 'Tomato sauce',
              type: 'canned/jarred',
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
              type: 'refrigerated',
              dishIds: ['dish-1', 'dish-2'],
            },
            {
              id: 'ingredient-4',
              uid: 'abc',
              name: 'Spinach',
              type: 'refrigerated',
              dishIds: ['dish-2'],
            },
            {
              id: 'ingredient-5',
              uid: 'abc',
              name: 'Walnuts',
              type: 'dry good',
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
