import { Meal } from '@atocha/menu-matriarch/shared/util';

export interface MealDto extends Omit<Meal, 'dishes' | 'tags'> {
  dishIds: string[];
  tagIds: string[];
}
