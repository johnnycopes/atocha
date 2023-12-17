// TODO: remove this chunk after newer version of Jest is installed
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { PIZZA, SALAD } from '@atocha/menu-matriarch/dishes/data-access';
import { mapMenuDtoToMenu } from './map-menu-dto-to-menu';
import { MENU_DTO } from '../mock-data';

describe('mapMenuDtoToMenu', () => {
  it('returns a menu when passed a menuDto, dishes, and userPreferences', () => {
    expect(
      mapMenuDtoToMenu({
        menuDto: MENU_DTO,
        dishes: [PIZZA, SALAD],
        preferences: {
          darkMode: false,
          dayNameDisplay: 'full',
          defaultMenuStartDay: 'Monday',
          emptyMealText: 'undecided',
          mealOrientation: 'horizontal',
          ingredientTypeOrder: ['ingredient-type-2', 'ingredient-type-1'],
        },
      })
    ).toEqual({
      id: 'menu-1',
      uid: 'abc',
      name: '8/23 - 8/30',
      fallbackText: 'undecided',
      favorited: false,
      orientation: 'horizontal',
      startDay: 'Sunday',
      contents: {
        Friday: ['dish-1', 'dish-2'],
        Monday: [],
        Saturday: [],
        Sunday: [],
        Thursday: [],
        Tuesday: ['dish-1'],
        Wednesday: ['dish-2'],
      },
      entries: [
        {
          day: 'Sunday',
          dishes: [],
        },
        {
          day: 'Monday',
          dishes: [],
        },
        {
          day: 'Tuesday',
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
          ],
        },
        {
          day: 'Wednesday',
          dishes: [
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
        },
        {
          day: 'Thursday',
          dishes: [],
        },
        {
          day: 'Friday',
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
        },
        {
          day: 'Saturday',
          dishes: [],
        },
      ],
    });
  });
});
