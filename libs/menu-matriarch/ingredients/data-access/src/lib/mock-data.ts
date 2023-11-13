import { createIngredientDto } from './create-ingredient-dto';
import { createIngredientTypeDto } from './create-ingredient-type-dto';

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
