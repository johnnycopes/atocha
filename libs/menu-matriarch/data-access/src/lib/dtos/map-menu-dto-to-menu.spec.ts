import {
  MENU_DTO,
  PIZZA_DTO,
  TAG_DTOS,
  SALAD_DTO,
} from '@atocha/menu-matriarch/util';
import { mapDishDtoToDish } from './map-dish-dto-to-dish';
import { mapMenuDtoToMenu } from './map-menu-dto-to-menu';

describe('mapMenuDtoToMenu', () => {
  it('returns a menu when passed a menuDto, dishes, and userPreferences', () => {
    expect(
      mapMenuDtoToMenu({
        menuDto: MENU_DTO,
        dishes: [
          mapDishDtoToDish(PIZZA_DTO, TAG_DTOS),
          mapDishDtoToDish(SALAD_DTO, TAG_DTOS),
        ],
        preferences: {
          darkMode: false,
          dayNameDisplay: 'full',
          defaultMenuStartDay: 'Monday',
          emptyMealText: 'undecided',
          mealOrientation: 'horizontal',
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
          ],
        },
        {
          day: 'Wednesday',
          dishes: [
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
        },
        {
          day: 'Saturday',
          dishes: [],
        },
      ],
    });
  });
});
