import { Dish } from '@atocha/menu-matriarch/shared/util';

export interface DishDto extends Omit<Dish, 'ingredients' | 'tags'> {
  ingredientIds: string[];
  tagIds: string[];
}
