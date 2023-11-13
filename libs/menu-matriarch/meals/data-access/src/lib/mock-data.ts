import { createMealDto } from './create-meal-dto';

export const MEAL_DTO = createMealDto({
  id: 'meal-1',
  uid: 'abc',
  name: 'Yin and Yang',
  description: 'Good and evil collide',
  dishIds: ['dish-1', 'dish-2'],
  tagIds: ['tag-1'],
});
