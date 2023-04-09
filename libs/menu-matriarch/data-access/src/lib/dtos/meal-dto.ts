import { Meal } from '@atocha/menu-matriarch/util';

export interface MealDto extends Omit<Meal, 'dishes' | 'tags'> {
  dishIds: string[];
  tagIds: string[];
}
