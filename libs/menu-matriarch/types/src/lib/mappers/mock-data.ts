import {
  createDishDto,
  createMealDto,
  createMenuDto,
  createTagDto,
} from '../functions/create-dtos';

export const MENU_DTO = createMenuDto({
  id: 'menu-1',
  uid: 'abc',
  name: '8/23 - 8/30',
  startDay: 'Sunday',
  favorited: false,
  contents: {
    Monday: [],
    Tuesday: ['dish-1'],
    Wednesday: ['dish-2'],
    Thursday: [],
    Friday: ['dish-1', 'dish-2'],
    Saturday: [],
    Sunday: [],
  },
});

export const MEAL_DTO = createMealDto({
  id: 'meal-1',
  uid: 'abc',
  name: 'Yin and Yang',
  description: 'Good and evil collide',
  dishIds: ['dish-1', 'dish-2'],
  tagIds: ['tag-1'],
});

export const PIZZA_DTO = createDishDto({
  id: 'dish-1',
  uid: 'abc',
  name: 'Pizza',
  description: 'Delicious round vessel from Italy',
  link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
  menuIds: [],
  tagIds: ['tag-1'],
  usages: 2,
});

export const SALAD_DTO = createDishDto({
  id: 'dish-2',
  uid: 'abc',
  name: 'Salad',
  description: 'Leaves in a bowl. Gross!',
  link: '',
  menuIds: [],
  tagIds: ['tag-1'],
  usages: 4,
});

export const TAG_DTOS = [
  createTagDto({
    id: 'tag-1',
    uid: 'abc',
    name: 'Vegetarian',
    dishIds: ['dish-1', 'dish-2'],
    mealIds: ['meal-1'],
  }),
];
