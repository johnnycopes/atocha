import { Tag } from './tag.interface';

export type DishType = 'main' | 'side' | 'dessert';

export interface Dish {
  id: string;
  uid: string;
  type: DishType;
  name: string;
  favorited: boolean;
  description: string;
  link: string;
  menuIds: string[];
  mealIds: string[];
  ingredients: string[];
  tags: Tag[];
  notes: string;
  usages: number;
}

export interface DishDto extends Omit<Dish, 'ingredients' | 'tags'> {
  ingredientIds: string[];
  tagIds: string[];
}

export interface FilteredDishesGroup {
  type: DishType;
  dishes: Dish[];
  placeholderText?: string;
}
