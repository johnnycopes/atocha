import { createDishDto } from './create-dish-dto';

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
