import { mapDishDtoToDish } from './map-dish-dto-to-dish';
import { mapMealDtoToMeal } from './map-meal-dto-to-meal';
import { MEAL_DTO, PIZZA_DTO, TAG_DTOS, SALAD_DTO } from './mock-data';

describe('mapMealDtoToMeal', () => {
  it('returns a meal when passed a mealDto, dishes, and tags', () => {
    expect(
      mapMealDtoToMeal({
        mealDto: MEAL_DTO,
        dishes: [
          mapDishDtoToDish(PIZZA_DTO, TAG_DTOS),
          mapDishDtoToDish(SALAD_DTO, TAG_DTOS),
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
