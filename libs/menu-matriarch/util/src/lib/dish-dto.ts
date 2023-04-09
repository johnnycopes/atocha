import { Dish } from './dish.interface';

export interface DishDto extends Omit<Dish, 'ingredients' | 'tags'> {
  ingredientIds: string[];
  tagIds: string[];
}
