import { Tag } from './tag.interface';

export type DishType = 'main' | 'side' | 'dessert';

export interface DishDto {
  id: string;
  uid: string;
  type: DishType;
  name: string;
  favorited: boolean;
  description: string;
  link: string;
  menuIds: string[];
  mealIds: string[];
  ingredientIds: string[];
  tagIds: string[];
  notes: string;
  usages: number;
}

export interface Dish extends Omit<DishDto, 'ingredientIds' | 'tagIds'> {
  ingredients: string[];
  tags: Tag[];
}

export interface FilteredDishesGroup {
  type: DishType;
  dishes: Dish[];
  placeholderText?: string;
}

export function getDishTypes(): readonly DishType[] {
  return ['main', 'side', 'dessert'];
}
