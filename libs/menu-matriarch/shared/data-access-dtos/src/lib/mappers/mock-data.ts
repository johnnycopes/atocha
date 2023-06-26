import { createDishDto } from '../creators/create-dish-dto';
import { createIngredientDto } from '../creators/create-ingredient-dto';
import { createIngredientTypeDto } from '../creators/create-ingredient-type-dto';
import { createMealDto } from '../creators/create-meal-dto';
import { createMenuDto } from '../creators/create-menu-dto';
import { createTagDto } from '../creators/create-tag-dto';

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

export const INGREDIENT_TYPE_DTOS = [
  createIngredientTypeDto({
    id: 'ingredient-type-1',
    uid: 'abc',
    name: 'preserved',
    ingredientIds: ['ingredient-2', 'ingredient-5'],
  }),
  createIngredientTypeDto({
    id: 'ingredient-type-2',
    uid: 'abc',
    name: 'refrigerated',
    ingredientIds: ['ingredient-1', 'ingredient-3', 'ingredient-4'],
  }),
];

export const INGREDIENT_DTOS = [
  createIngredientDto({
    id: 'ingredient-1',
    uid: 'abc',
    name: 'Dough',
    typeId: 'ingredient-type-2',
    dishIds: ['dish-1'],
  }),
  createIngredientDto({
    id: 'ingredient-2',
    uid: 'abc',
    name: 'Tomato sauce',
    typeId: 'ingredient-type-1',
    dishIds: ['dish-1'],
  }),
  createIngredientDto({
    id: 'ingredient-3',
    uid: 'abc',
    name: 'Goat cheese',
    typeId: 'ingredient-type-2',
    dishIds: ['dish-1', 'dish-2'],
  }),
  createIngredientDto({
    id: 'ingredient-4',
    uid: 'abc',
    name: 'Spinach',
    typeId: 'ingredient-type-2',
    dishIds: ['dish-2'],
  }),
  createIngredientDto({
    id: 'ingredient-5',
    uid: 'abc',
    name: 'Walnuts',
    typeId: 'ingredient-type-1',
    dishIds: ['dish-2'],
  }),
];

export const PIZZA_DTO = createDishDto({
  id: 'dish-1',
  uid: 'abc',
  name: 'Pizza',
  description: 'Delicious round vessel from Italy',
  link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
  menuIds: [],
  ingredientIds: ['ingredient-1', 'ingredient-2', 'ingredient-3'],
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
  ingredientIds: ['ingredient-3', 'ingredient-4', 'ingredient-5'],
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
