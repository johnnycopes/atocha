import { Meal } from './meal.interface';

export interface MealDto extends Omit<Meal, 'dishes' | 'tags'> {
  dishIds: string[];
  tagIds: string[];
}
