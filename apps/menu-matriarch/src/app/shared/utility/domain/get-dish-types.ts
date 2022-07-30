import { DishType } from "../../models/dish-type.type";

export function getDishTypes(): readonly DishType[] {
  return ['main', 'side', 'dessert'];
}
