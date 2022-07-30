import { DishType } from "../dish-type.type";

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
